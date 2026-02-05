'use client';

import { Screening } from '@/types';
import ScreeningCard from './ScreeningCard';
import { Calendar } from 'lucide-react';

interface ScreeningListProps {
    screenings: Screening[];
}

export default function ScreeningList({ screenings }: ScreeningListProps) {
    if (screenings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-text-secondary bg-surface rounded-lg border border-surface-border">
                <Calendar className="w-10 h-10 mb-2 opacity-50" />
                <p className="text-sm">Brak dostępnych seansów</p>
            </div>
        );
    }

    return (
        <div className="grid gap-3">
            {screenings.map((screening, index) => (
                <ScreeningCard key={index} screening={screening} />
            ))}
        </div>
    );
}