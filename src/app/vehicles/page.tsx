// src/app/vehicles/page.tsx
'use client'; // Requires state for filtering

import { useState, useEffect, useMemo } from 'react';
import { getAllVehicles } from '@/lib/api';
import { Vehicle } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import ItemGrid from '@/components/shared/ItemGrid';
import SearchBar from '@/components/shared/SearchBar';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function loadVehicles() {
      try {
        setLoading(true);
        setError(null);
        const fetchedVehicles = await getAllVehicles();
        setVehicles(fetchedVehicles);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch vehicles.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    if (!searchTerm) {
      return vehicles;
    }
    return vehicles.filter((vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicle_class?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vehicles, searchTerm]);

   // Adapt Vehicle to GridItem format
   const gridItems = filteredVehicles.map(v => ({
      id: v.id,
      name: v.name,
      description: `Class: ${v.vehicle_class || 'N/A'}`, // Example description
      // image: '/placeholder-vehicle.png' // Add placeholder logic
  }));


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vehicles</h1>
       <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search vehicles by name or class..."
      />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <ItemGrid items={gridItems} basePath="/vehicles" />
      )}
    </div>
  );
}