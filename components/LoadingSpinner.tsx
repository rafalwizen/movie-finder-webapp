'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    message?: string;
}

export default function LoadingSpinner({ message = "Ładowanie..." }: LoadingSpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-text-secondary">{message}</p>
        </div>
    );
}