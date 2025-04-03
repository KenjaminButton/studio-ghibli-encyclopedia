import Link from 'next/link';
import Image from 'next/image'; // Add a Ghibli-themed image

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Studio Ghibli Encyclopedia</h1>
      <p className="text-lg mb-8">
        Explore the enchanting worlds created by Studio Ghibli. Discover information about films, characters, locations, and more.
      </p>
      {/* Add an image */}
      <div className="my-8 flex justify-center">
        <Image
            src="/placeholder-ghibli.png" // Replace with an actual image in your public folder in public folder
            alt="Studio Ghibli collage"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/movies" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-center text-xl shadow">
            Explore Movies
        </Link>
        <Link href="/characters" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-center text-xl shadow">
            Discover Characters
        </Link>
        <Link href="/locations" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-center text-xl shadow">
            Visit Locations
        </Link>
        <Link href="/species" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-center text-xl shadow">
            Uncover Species
        </Link>
        <Link href="/vehicles" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition duration-200 text-center text-xl shadow">
            Explore Vehicles
        </Link>
      </div>
    </div>
  );
}