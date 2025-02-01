import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Footer } from '@/lib/Footer';
import { ThemeProvider } from '@/components/theme-providor.';

export const metadata: Metadata = {
    title: 'Rootes Laundromat',
    description: 'Tracker for Rootes Laundromat'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta
                    content="width=device-width, initial-scale=1.0, maximum-scale=5"
                    name="viewport"
                />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="flex justify-center md:p-4 p-2 min-h-[100vh]">
                        <div className="w-full md:max-w-4xl">{children}</div>
                    </main>
                    <Footer />
                </ThemeProvider>

                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
