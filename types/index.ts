export interface Movie {
    id: number;
    title: string;
    year: number | null;
    posterUrl: string | null;
}

export interface Screening {
    screeningDatetime: string;
    cinemaName: string;
    cinemaCity: string | null;
    cinemaAddress: string | null;
    screeningUrl: string | null;
    providerCode: string;
}

export interface ApiError {
    error: string;
    status: number;
}