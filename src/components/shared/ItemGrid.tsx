import React from 'react';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import Image from 'next/image'; // Use next/image for optimization

// Generic item type - adjust based on actual data structures
interface GridItem {
  id: string;
  title?: string; // For movies
  name?: string; // For people, locations, etc.
  image?: string; // Optional image URL
  description?: string; // Optional short description
}

interface ItemGridProps<T extends GridItem> {
  items: T[];
  basePath: string; // e.g., '/movies', '/characters'
}

export default function ItemGrid<T extends GridItem>({ items, basePath }: ItemGridProps<T>) {
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-500 my-8">No items found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <Link href={`${basePath}/${item.id}`} key={item.id} className="block group">
          <Card className="h-full flex flex-col">
            {/* Basic Image Placeholder - Refine this */}
            {item.image ? (
              <div className="relative h-48 w-full mb-4">
                  <Image
                    src={item.image}
                    alt={item.title || item.name || 'Item image'}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Example sizes
                  />
              </div>
            ) : (
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400 mb-4 rounded-t-lg">
                 No Image
              </div>
            )}
            <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                {item.title || item.name}
                </h3>
                {item.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
                )}
            </div>

          </Card>
        </Link>
      ))}
    </div>
  );
}
