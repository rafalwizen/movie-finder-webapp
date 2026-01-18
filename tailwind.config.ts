import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./globals.css"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4F46E5',
                    dark: '#4338CA',
                    light: '#6366F1',
                },
                secondary: {
                    DEFAULT: '#64748B',
                    dark: '#475569',
                    light: '#94A3B8',
                },
                accent: {
                    DEFAULT: '#F59E0B',
                    dark: '#D97706',
                    light: '#FBBF24',
                },
                background: {
                    DEFAULT: '#F9FAFB',
                    dark: '#F3F4F6',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    border: '#E5E7EB',
                },
                text: {
                    primary: '#111827',
                    secondary: '#6B7280',
                    tertiary: '#9CA3AF',
                },
                error: {
                    DEFAULT: '#EF4444',
                    light: '#FEE2E2',
                    dark: '#DC2626',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;