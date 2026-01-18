'use client';

import { Movie } from '@/types';
import MovieCard from './MovieCard';
import { Film } from 'lucide-react';

interface MovieListProps {
    movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
    if (movies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-text-secondary">
                <Film className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm">Nie znaleziono filmów</p>
            </div>
        );
    }

    return (
        <div className="grid gap-3">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}