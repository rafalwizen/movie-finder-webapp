'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Movie, Screening } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import ScreeningList from '@/components/ScreeningList';

interface MovieDetailsClientProps {
    movie: Movie;
}

export default function MovieDetailsClient({ movie }: MovieDetailsClientProps) {
    const router = useRouter();
    const [screenings, setScreenings] = useState<Screening[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchScreenings = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/screenings?title=${encodeURIComponent(movie.title)}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Nie udało się pobrać seansów');
                }

                const data: Screening[] = await response.json();
                setScreenings(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Wystąpił błąd');
            } finally {
                setLoading(false);
            }
        };

        fetchScreenings();
    }, [movie.title]);

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-2xl mx-auto px-4 py-6">
                <button
                    onClick={() => router.push('/')}
                    className="mb-4 text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1 transition-colors"
                >
                    ← Powrót
                </button>

                <div className="bg-surface rounded-lg shadow-sm border border-surface-border overflow-hidden mb-6">
                    <div className="flex gap-4 p-4">
                        <div className="w-24 h-36 flex-shrink-0 bg-background-dark rounded overflow-hidden">
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
                            <h1 className="text-xl font-bold text-text-primary mb-1">{movie.title}</h1>
                            <p className="text-text-secondary">{movie.year}</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-lg font-semibold text-text-primary mb-3">Dostępne seanse</h2>

                {loading && <LoadingSpinner message="Ładowanie seansów..." />}
                {error && <ErrorMessage message={error} />}
                {!loading && !error && <ScreeningList screenings={screenings} />}
            </div>
        </div>
    );
}