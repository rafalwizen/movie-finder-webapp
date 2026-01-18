'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="flex items-center gap-2 p-4 bg-error-light border border-error rounded-lg text-error-dark text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{message}</span>
        </div>
    );
}