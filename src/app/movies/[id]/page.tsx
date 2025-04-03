import { getMovieById, getMultipleResources } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Person, Location, Species, Vehicle } from '@/types'; // Import related types

// Optional: Generate static paths if needed (improves performance)
// export async function generateStaticParams() {
//   const movies = await getAllMovies();
//   return movies.map((movie) => ({
//     id: movie.id,
//   }));
// }

interface MovieDetailPageProps {
  params: { id: string };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = params.id;
  let movie;
  let relatedPeople: Person[] = [];
  let relatedLocations: Location[] = [];
    // Add species, vehicles if needed

  try {
    movie = await getMovieById(movieId);

    // Fetch related data concurrently (Example for People and Locations)
    // The API returns URLs, so we use getMultipleResources
    const [peopleResults, locationResults] = await Promise.all([
        getMultipleResources<Person>(movie.people),
        getMultipleResources<Location>(movie.locations),
        // Add promises for species, vehicles here if needed
    ]);
    relatedPeople = peopleResults;
    relatedLocations = locationResults;

  } catch (error: any) {
     // getMovieById already calls notFound() on 404
     // Handle other potential errors during related data fetching if needed
    console.error(`Failed to fetch movie details or related data for ID ${movieId}:`, error);
     // Depending on requirements, you might show the page with partial data or throw an error
     // For now, we let the error boundary catch it if related data fails,
     // as the movie data itself might still be valid.
     if (!movie) {
         // If the initial movie fetch failed for non-404 reasons, re-throw or handle
         throw new Error(`Could not load movie data: ${error.message}`);
     }
  }

  // If movie fetch succeeded but somehow movie is still undefined (shouldn't happen with notFound), handle it.
  if (!movie) {
      notFound();
  }


  return (
    <article className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      {movie.movie_banner && (
          <div className="relative h-64 md:h-96 w-full mb-6 -mx-6 -mt-6 md:-mx-8 md:-mt-8 rounded-t-lg overflow-hidden">
              <Image
                src={movie.movie_banner}
                alt={`${movie.title} banner`}
                fill
                style={{ objectFit: 'cover' }}
                priority // Prioritize loading banner image
                sizes="100vw"
              />
          </div>
      )}
       <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
       <p className="text-lg text-gray-600 mb-4 italic">{movie.original_title_romanised} ({movie.original_title})</p>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-700">
           <span><strong>Director:</strong> {movie.director}</span>
           <span><strong>Producer:</strong> {movie.producer}</span>
           <span><strong>Release Date:</strong> {movie.release_date}</span>
           <span><strong>Running Time:</strong> {movie.running_time} min</span>
           <span><strong>RT Score:</strong> {movie.rt_score}%</span>
       </div>

       <p className="text-gray-800 leading-relaxed mb-8">{movie.description}</p>

       {/* Related Characters */}
       {relatedPeople.length > 0 && (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Characters</h2>
            <ul className="list-disc list-inside space-y-1">
                {relatedPeople.map(person => (
                    <li key={person.id}>
                        <Link href={`/characters/${person.id}`} className="text-blue-600 hover:underline">
                           {person.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
       )}

       {/* Related Locations */}
       {relatedLocations.length > 0 && (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Locations</h2>
             <ul className="list-disc list-inside space-y-1">
                {relatedLocations.map(location => (
                    <li key={location.id}>
                        <Link href={`/locations/${location.id}`} className="text-blue-600 hover:underline">
                           {location.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
       )}

       {/* Add sections for Species, Vehicles similarly if implemented */}

    </article>
  );
}