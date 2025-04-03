// src/app/species/[id]/page.tsx
import { getSpeciesById, getMultipleResources } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Person, Movie } from '@/types'; // Import related types

interface SpeciesDetailPageProps {
  params: { id: string };
}

export default async function SpeciesDetailPage({ params }: SpeciesDetailPageProps) {
  const speciesId = params.id;
  let species;
  let relatedPeople: Person[] = [];
  let relatedMovies: Movie[] = [];

   try {
     species = await getSpeciesById(speciesId);
     // Fetch related data concurrently (API provides URLs)
     const [peopleResults, movieResults] = await Promise.all([
         getMultipleResources<Person>(species.people),
         getMultipleResources<Movie>(species.films),
     ]);
     relatedPeople = peopleResults;
     relatedMovies = movieResults;

   } catch (error: any) {
      // getSpeciesById handles 404 via notFound()
      console.error(`Failed to load species ${speciesId} or related data:`, error);
      if (!species) {
         throw new Error(`Could not load species data: ${error.message}`);
     }
   }

  if (!species) {
    notFound();
  }

  return (
    <article className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{species.name}</h1>

         <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 text-gray-700">
            {species.classification && <span><strong>Classification:</strong> {species.classification}</span>}
            {species.eye_colors && <span><strong>Common Eye Colors:</strong> {species.eye_colors}</span>}
            {species.hair_colors && <span><strong>Common Hair Colors:</strong> {species.hair_colors}</span>}
         </div>

         {/* Add description if available */}
         {/* <p className="text-gray-800 leading-relaxed mb-8">{species.description}</p> */}


         {/* Related People (Members of this Species) */}
        {relatedPeople.length > 0 && (
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Notable Members</h2>
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