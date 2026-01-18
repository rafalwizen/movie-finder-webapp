import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center">
                <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-text-primary mb-2">Film nie został znaleziony</h1>
                <p className="text-text-secondary mb-6">Nie mogliśmy znaleźć filmu o podanym identyfikatorze.</p>
                <Link
                    href="/"
                    className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                    Powrót do wyszukiwania
                </Link>
            </div>
        </div>
    );
}