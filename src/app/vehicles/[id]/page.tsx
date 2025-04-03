// src/app/vehicles/[id]/page.tsx
import { getVehicleById, getResourceByUrl, getMultipleResources } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Person, Movie } from '@/types'; // Import related types

interface VehicleDetailPageProps {
  params: { id: string };
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const vehicleId = params.id;
  let vehicle;
  let pilot: Person | null = null; // Pilot seems to be a single URL in docs
  let relatedMovies: Movie[] = [];

   try {
     vehicle = await getVehicleById(vehicleId);

     // Fetch related data concurrently (API provides URLs)
     // Use Promise.allSettled if pilot URL might be empty/invalid to avoid full failure
     const [pilotResult, movieResults] = await Promise.allSettled([
         vehicle.pilot ? getResourceByUrl<Person>(vehicle.pilot) : Promise.resolve(null), // Fetch pilot if URL exists
         getMultipleResources<Movie>(vehicle.films),
     ]);

     if(pilotResult.status === 'fulfilled' && pilotResult.value) {
        pilot = pilotResult.value;
     } else if (pilotResult.status === 'rejected') {
         console.error(`Failed to fetch pilot for vehicle ${vehicleId}:`, pilotResult.reason);
         // Decide how to handle pilot fetch failure (e.g., display 'Unknown')
     }

     if(movieResults.status === 'fulfilled') {
        relatedMovies = movieResults.value;
     } else {
         console.error(`Failed to fetch related movies for vehicle ${vehicleId}:`, movieResults.reason);
         // Decide how to handle movie fetch failure
     }

   } catch (error: any) {
      // getVehicleById handles 404 via notFound()
      console.error(`Failed to load vehicle ${vehicleId} or related data:`, error);
      if (!vehicle) {
         throw new Error(`Could not load vehicle data: ${error.message}`);
     }
   }

  if (!vehicle) {
    notFound();
  }

  return (
    <article className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{vehicle.name}</h1>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6 text-gray-700">
            {vehicle.vehicle_class && <span><strong>Class:</strong> {vehicle.vehicle_class}</span>}
            {vehicle.length && <span><strong>Length:</strong> {vehicle.length} meters</span>} {/* Assuming meters */}
             {pilot ? (
                <span>
                    <strong>Pilot:</strong>{' '}
                    <Link href={`/characters/${pilot.id}`} className="text-blue-600 hover:underline">
                        {pilot.name}
                    </Link>
                </span>
            ) : (
                 vehicle.pilot && <span><strong>Pilot:</strong> Unknown or N/A</span> // Display if pilot URL existed but fetch failed/was null
            )}
         </div>

        {vehicle.description && (
            <div className="mb-8">
                 <h2 className="text-2xl font-semibold mb-2 border-b pb-1">Description</h2>
                 <p className="text-gray-800 leading-relaxed">{vehicle.description}</p>
            </div>
        )}

         {/* Related Movies (Appears In) */}
        {relatedMovies.length > 0 && (
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Appears In</h2>
                <ul className="list-disc list-inside space-y-1">
                    {relatedMovies.map(movie => (
                        <li key={movie.id}>
                            <Link href={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
                            {movie.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </article>
  );
}