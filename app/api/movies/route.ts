import { NextRequest, NextResponse } from 'next/server';
import { Movie } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q');

        const url = query
            ? `${API_BASE_URL}/api/movies?q=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/api/movies`;

        const response = await fetch(url, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Nie udało się pobrać filmów' },
                { status: response.status }
            );
        }

        const data: Movie[] = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json(
            { error: 'Wystąpił błąd podczas pobierania filmów' },
            { status: 500 }
        );
    }
}