export const PROVIDERS = {
    CINEMA_CITY: 'Cinema City',
    MULTIKINO: 'Multikino'
} as const;

export type ProviderCode = keyof typeof PROVIDERS;