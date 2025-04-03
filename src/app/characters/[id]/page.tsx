import { getPersonById, getMultipleResources } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Movie } from '@/types'; // Import related types

interface CharacterDetailPageProps {
  params: { id: string };
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const personId = params.id;
  let person;
  let relatedMovies: Movie[] = [];

  try {
     person = await getPersonById(personId);
     // Fetch related movies (API provides URLs)
     relatedMovies = await getMultipleResources<Movie>(person.films);
  } catch (error: any) {
      // getPersonById handles 404 via notFound()
      console.error(`Failed to load character ${personId} or related data:`, error);
       if (!person) {
         throw new Error(`Could not load character data: ${error.message}`);
     }
  }

  if (!person) {
    notFound();
  }

  // Basic placeholder image logic - replace with actual image if API provides one
  const imageUrl = `/placeholder-character.png`; // Or logic based on person.image

  return (
     <article className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        {/* Consider adding an image if available */}
        {/* <div className="float-right ml-4 mb-4"> <Image src={imageUrl} alt={person.name} width={150} height={150} className="rounded-full"/> </div> */}

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{person.name}</h1>

         <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 text-gray-700">
            {person.gender && <span><strong>Gender:</strong> {person.gender}</span>}
            {person.age && <span><strong>Age:</strong> {person.age}</span>}
            {person.eye_color && <span><strong>Eye Color:</strong> {person.eye_color}</span>}
            {person.hair_color && <span><strong>Hair Color:</strong> {person.hair_color}</span>}
            {/* Add Species link if available/needed */}
         </div>

         {/* Add description if available in API */}
         {/* <p className="text-gray-800 leading-relaxed mb-8">{person.description}</p> */}

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