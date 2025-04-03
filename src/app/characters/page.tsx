'use client'; // Requires state for filtering

import { useState, useEffect, useMemo } from 'react';
import { getAllPeople } from '@/lib/api';
import { Person } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import ItemGrid from '@/components/shared/ItemGrid';
import SearchBar from '@/components/shared/SearchBar';

export default function CharactersPage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function loadPeople() {
      try {
        setLoading(true);
        setError(null);
        const fetchedPeople = await getAllPeople();
        setPeople(fetchedPeople);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch characters.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPeople();
  }, []);

  const filteredPeople = useMemo(() => {
    if (!searchTerm) {
      return people;
    }
    return people.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
      // Add other filterable fields if needed (e.g., gender, age)
    );
  }, [people, searchTerm]);

  // Adapt Person to GridItem format - add image handling if needed
  const gridItems = filteredPeople.map(p => ({
      id: p.id,
      name: p.name,
      // image: p.image || '/placeholder-character.png' // Add placeholder logic
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Characters</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search characters by name..."
      />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <ItemGrid items={gridItems} basePath="/characters" />
      )}
    </div>
  );
}