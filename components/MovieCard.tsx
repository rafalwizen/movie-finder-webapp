'use client';

import { Movie } from '@/types';
import Link from 'next/link';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link
            href={`/movies/${movie.id}`}
            className="flex gap-3 p-3 bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow border border-surface-border"
        >
            <div className="w-16 h-24 flex-shrink-0 bg-background-dark rounded overflow-hidden">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="150"%3E%3Crect fill="%23e5e7eb" width="100" height="150"/%3E%3C/svg%3E';
                    }}
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary truncate">{movie.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{movie.year}</p>
            </div>
        </Link>
    );
}