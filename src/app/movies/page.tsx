'use client'; // This page requires state and effects for client-side filtering

import { useState, useEffect, useMemo } from 'react';
import { getAllMovies } from '@/lib/api';
import { Movie } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import ItemGrid from '@/components/shared/ItemGrid';
import SearchBar from '@/components/shared/SearchBar';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);
        const fetchedMovies = await getAllMovies();
        setMovies(fetchedMovies);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movies.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    if (!searchTerm) {
      return movies;
    }
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.original_title_romanised.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Studio Ghibli Movies</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search movies by title, original title, or director..."
      />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <ItemGrid items={filteredMovies} basePath="/movies" />
      )}
    </div>
  );
}