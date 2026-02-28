'use client';

import { useState } from 'react';
import { Screening } from '@/types';
import ScreeningCard from './ScreeningCard';
import { Calendar, Search } from 'lucide-react';

interface ScreeningListProps {
    screenings: Screening[];
}

export default function ScreeningList({ screenings }: ScreeningListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const filteredScreenings = screenings.filter((screening) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            !searchQuery ||
            screening.cinemaName.toLowerCase().includes(searchLower) ||
            screening.cinemaCity.toLowerCase().includes(searchLower) ||
            screening.providerCode.toLowerCase().includes(searchLower);

        const screeningDate = new Date(screening.screeningDatetime);
        const matchesDateFrom = !dateFrom || screeningDate >= new Date(dateFrom);

        const matchesDateTo = !dateTo || screeningDate <= new Date(dateTo);

        return matchesSearch && matchesDateFrom && matchesDateTo;
    });

    if (screenings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-text-secondary bg-surface rounded-lg border border-surface-border">
                <Calendar className="w-10 h-10 mb-2 opacity-50" />
                <p className="text-sm">Brak dostępnych seansów</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="mb-3 bg-surface rounded-lg border border-surface-border p-4 space-y-4">
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Szukaj po kinie, mieście lub rodzaju..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 pl-4 pr-3 py-2 bg-background border border-surface-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs text-text-secondary mb-1">Od daty</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-full pl-4 pr-3 py-2 bg-background border border-surface-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs text-text-secondary mb-1">Do daty</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="w-full pl-4 pr-3 py-2 bg-background border border-surface-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        />
                    </div>
                </div>

                {/* Informacja o liczbie wyników */}
                <p className="text-xs text-text-secondary">
                    {filteredScreenings.length} z {screenings.length} seansów
                </p>
            </div>

            {/* Lista przefiltrowanych seansów */}
            {filteredScreenings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-text-secondary bg-surface rounded-lg border border-surface-border">
                    <Search className="w-10 h-10 mb-2 opacity-50" />
                    <p className="text-sm">Brak seansów spełniających kryteria</p>
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