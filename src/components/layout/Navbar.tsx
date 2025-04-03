// src/components/layout/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center"> {/* Added flex-wrap for smaller screens */}
        <Link href="/" className="text-2xl font-bold text-blue-700 hover:text-blue-900 mb-2 sm:mb-0"> {/* Added margin-bottom for wrap */}
          Ghibli Encyclopedia
        </Link>
        {/* Consider a mobile menu button for very small screens */}
        <div className="space-x-3 sm:space-x-4 text-sm sm:text-base"> {/* Adjusted spacing */}
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/movies" className="text-gray-600 hover:text-gray-900">Movies</Link>
          <Link href="/characters" className="text-gray-600 hover:text-gray-900">Characters</Link>
          <Link href="/locations" className="text-gray-600 hover:text-gray-900">Locations</Link>
          <Link href="/species" className="text-gray-600 hover:text-gray-900">Species</Link> {/* Added */}
          <Link href="/vehicles" className="text-gray-600 hover:text-gray-900">Vehicles</Link> {/* Added */}
        </div>
      </div>
    </nav>
  );
}