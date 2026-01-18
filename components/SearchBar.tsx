'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Wyszukaj film..." }: SearchBarProps) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text-tertiary" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="block w-full pl-10 pr-3 py-3 border border-surface-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface shadow-sm transition-colors"
            />
        </div>
    );
}