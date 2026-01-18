'use client';

import { useState, useEffect, useCallback } from 'react';
import { Film } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import MovieList from '@/components/MovieList';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { Movie } from '@/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = query
          ? `/api/movies?q=${encodeURIComponent(query)}`
          : '/api/movies';

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Nie udało się wyszukać filmów');
      }

      const data: Movie[] = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMovies(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchMovies]);

  return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Film className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-text-primary">CinemaFinder</h1>
            </div>
            <p className="text-text-secondary text-sm">Znajdź swój ulubiony film w kinach</p>
          </div>

          <div className="mb-6">
            <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
            />
          </div>

          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && <MovieList movies={movies} />}
        </div>
      </div>
  );
}