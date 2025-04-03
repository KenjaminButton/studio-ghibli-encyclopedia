'use client'; // Requires state for filtering

import { useState, useEffect, useMemo } from 'react';
import { getAllLocations } from '@/lib/api';
import { Location } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import ItemGrid from '@/components/shared/ItemGrid';
import SearchBar from '@/components/shared/SearchBar';

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function loadLocations() {
      try {
        setLoading(true);
        setError(null);
        const fetchedLocations = await getAllLocations();
        setLocations(fetchedLocations);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch locations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadLocations();
  }, []);

  const filteredLocations = useMemo(() => {
    if (!searchTerm) {
      return locations;
    }
    return locations.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.climate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.terrain?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [locations, searchTerm]);

   // Adapt Location to GridItem format
   const gridItems = filteredLocations.map(l => ({
      id: l.id,
      name: l.name,
      // image: l.image || '/placeholder-location.png' // Add placeholder logic
      // description: `Climate: ${l.climate}, Terrain: ${l.terrain}` // Optional desc
  }));


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Locations</h1>
       <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search locations by name, climate, or terrain..."
      />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <ItemGrid items={gridItems} basePath="/locations" />
      )}
    </div>
  );
}