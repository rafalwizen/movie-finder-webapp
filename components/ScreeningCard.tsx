'use client';

import { Screening } from '@/types';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface ScreeningCardProps {
    screening: Screening;
}

export default function ScreeningCard({ screening }: ScreeningCardProps) {
    const formatDateTime = (datetime: string) => {
        const date = new Date(datetime);
        return {
            date: date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }),
            time: date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const { date, time } = formatDateTime(screening.screeningDatetime);

    return (
        <div className="bg-surface rounded-lg shadow-sm border border-surface-border p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                    <h3 className="font-semibold text-text-primary">{screening.cinemaName}</h3>
                    <div className="flex items-center gap-1 text-sm text-text-secondary mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{screening.cinemaCity}, {screening.cinemaAddress}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-text-primary mb-3">
                <Calendar className="w-4 h-4" />
                <span>{date}, {time}</span>
            </div>

            <a
                href={screening.screeningUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
                Kup bilet
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}