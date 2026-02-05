'use client';

import { Screening } from '@/types';
import ScreeningCard from './ScreeningCard';
import { Calendar, Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';

interface ScreeningListProps {
    screenings: Screening[];
}

export default function ScreeningList({ screenings }: ScreeningListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const filteredScreenings = useMemo(() => {
        return screenings.filter(screening => {
            // Text search filter (cinema name OR city)
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const matchesCinema = screening.cinemaName.toLowerCase().includes(query);
                const matchesCity = screening.cinemaCity.toLowerCase().includes(query);
                if (!matchesCinema && !matchesCity) {
                    return false;
                }
            }

            // Date range filter
            const screeningDate = new Date(screening.screeningDatetime);
            screeningDate.setHours(0, 0, 0, 0); // Reset time for date-only comparison

            if (dateFrom) {
                const fromDate = new Date(dateFrom);
                fromDate.setHours(0, 0, 0, 0);
                if (screeningDate < fromDate) {
                    return false;
                }
            }

            if (dateTo) {
                const toDate = new Date(dateTo);
                toDate.setHours(0, 0, 0, 0);
                if (screeningDate > toDate) {
                    return false;
                }
            }

            return true;
        });
    }, [screenings, searchQuery, dateFrom, dateTo]);

    const hasActiveFilters = searchQuery.trim() || dateFrom || dateTo;

    const clearFilters = () => {
        setSearchQuery('');
        setDateFrom('');
        setDateTo('');
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="bg-surface rounded-lg border border-surface-border p-4">
                <div className="grid gap-3 md:grid-cols-3">
                    {/* Search input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Szukaj kina lub miasta..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-background border border-surface-border rounded-md text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Date from */}
                    <div>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-surface-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Data od"
                        />
                    </div>

                    {/* Date to */}
                    <div>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-surface-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Data do"
                        />
                    </div>
                </div>

                {/* Clear filters button */}
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="mt-3 flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Wyczyść filtry
                    </button>
                )}
            </div>

            {/* Results count */}
            {hasActiveFilters && (
                <div className="text-sm text-text-secondary">
                    Znaleziono: {filteredScreenings.length} {filteredScreenings.length === 1 ? 'seans' : 'seansów'}
                </div>
            )}

            {/* Screenings list */}
            {filteredScreenings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-text-secondary bg-surface rounded-lg border border-surface-border">
                    <Calendar className="w-10 h-10 mb-2 opacity-50" />
                    <p className="text-sm">
                        {hasActiveFilters ? 'Nie znaleziono seansów spełniających kryteria' : 'Brak dostępnych seansów'}
                    </p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {filteredScreenings.map((screening, index) => (
                        <ScreeningCard key={index} screening={screening} />
                    ))}
                </div>
            )}
        </div>
    );
}