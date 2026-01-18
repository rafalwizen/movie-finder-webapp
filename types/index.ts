export interface Movie {
    id: number;
    title: string;
    year: number;
    posterUrl: string;
}

export interface Screening {
    screeningDatetime: string;
    cinemaName: string;
    cinemaCity: string;
    cinemaAddress: string;
    screeningUrl: string;
}

export interface ApiError {
    error: string;
    status: number;
}