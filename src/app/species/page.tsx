// src/app/species/page.tsx
'use client'; // Requires state for filtering

import { useState, useEffect, useMemo } from 'react';
import { getAllSpecies } from '@/lib/api';
import { Species } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import ItemGrid from '@/components/shared/ItemGrid';
import SearchBar from '@/components/shared/SearchBar';

export default function SpeciesPage() {
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function loadSpecies() {
      try {
        setLoading(true);
        setError(null);
        const fetchedSpecies = await getAllSpecies();
        setSpeciesList(fetchedSpecies);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch species.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSpecies();
  }, []);

  const filteredSpecies = useMemo(() => {
    if (!searchTerm) {
      return speciesList;
    }
    return speciesList.filter((species) =>
      species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      species.classification?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [speciesList, searchTerm]);

   // Adapt Species to GridItem format
   const gridItems = filteredSpecies.map(s => ({
      id: s.id,
      name: s.name,
      description: `Classification: ${s.classification || 'N/A'}`, // Example description
      // image: '/placeholder-species.png' // Add placeholder logic if needed
  }));


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Species</h1>
       <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search species by name or classification..."
      />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <ItemGrid items={gridItems} basePath="/species" />
      )}
    </div>
  );
}