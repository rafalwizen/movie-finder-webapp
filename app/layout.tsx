import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "CinemaFinder - Znajdź swój film w kinach",
    description: "Wyszukuj filmy i znajdź seanse w kinach w całej Polsce",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
        <body>{children}</body>
        </html>
    );
}