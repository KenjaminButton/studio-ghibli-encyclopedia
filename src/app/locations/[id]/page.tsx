import { getLocationById, getMultipleResources } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Person, Movie } from '@/types'; // Import related types

interface LocationDetailPageProps {
  params: { id: string };
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const locationId = params.id;
  let location;
  let relatedResidents: Person[] = []; // Assuming residents are People
  let relatedMovies: Movie[] = [];

   try {
     location = await getLocationById(locationId);
     // Fetch related data concurrently
    const [residentResults, movieResults] = await Promise.all([
        getMultipleResources<Person>(location.residents), // Assuming residents are people URLs
        getMultipleResources<Movie>(location.films),
    ]);
    relatedResidents = residentResults;
    relatedMovies = movieResults;

   } catch (error: any) {
      // getLocationById handles 404 via notFound()
      console.error(`Failed to load location ${locationId} or related data:`, error);
      if (!location) {
         throw new Error(`Could not load location data: ${error.message}`);
     }
   }

  if (!location) {
    notFound();
  }

  return (
    <article className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{location.name}</h1>

         <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 text-gray-700">
            {location.climate && <span><strong>Climate:</strong> {location.climate}</span>}
            {location.terrain && <span><strong>Terrain:</strong> {location.terrain}</span>}
            {location.surface_water && <span><strong>Surface Water:</strong> {location.surface_water}%</span>}
         </div>

         {/* Add description if available */}
         {/* <p className="text-gray-800 leading-relaxed mb-8">{location.description}</p> */}

         {/* Related Residents */}
        {relatedResidents.length > 0 && (
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Notable Residents</h2>
                <ul className="list-disc list-inside space-y-1">
                    {relatedResidents.map(person => (
                        <li key={person.id}>
                            <Link href={`/characters/${person.id}`} className="text-blue-600 hover:underline">
                            {person.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}

         {/* Related Movies */}
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