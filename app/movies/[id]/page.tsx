import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MovieDetailsClient from './MovieDetailsClient';
import { Movie } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

async function getMovie(id: string): Promise<Movie | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/movies`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        }

        const movies: Movie[] = await response.json();
        return movies.find(m => m.id === parseInt(id)) || null;
    } catch (error) {
        console.error('Error fetching movie:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const movie = await getMovie(params.id);

    if (!movie) {
        return {
            title: 'Film nie znaleziony - CinemaFinder',
        };
    }

    return {
        title: `${movie.title} (${movie.year}) - CinemaFinder`,
        description: `Znajdź seanse filmu ${movie.title} w kinach w całej Polsce`,
    };
}

export default async function MoviePage({ params }: { params: { id: string } }) {
    const movie = await getMovie(params.id);

    if (!movie) {
        notFound();
    }

    return <MovieDetailsClient movie={movie} />;
}