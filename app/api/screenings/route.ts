import { NextRequest, NextResponse } from 'next/server';
import { Screening } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const title = searchParams.get('title');

        if (!title) {
            return NextResponse.json(
                { error: 'Brak wymaganego parametru title' },
                { status: 400 }
            );
        }

        const url = `${API_BASE_URL}/api/screenings/search?title=${encodeURIComponent(title)}`;

        const response = await fetch(url, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Nie udało się pobrać seansów' },
                { status: response.status }
            );
        }

        const data: Screening[] = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching screenings:', error);
        return NextResponse.json(
            { error: 'Wystąpił błąd podczas pobierania seansów' },
            { status: 500 }
        );
    }
}