import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { websiteSchema } from './schema';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
});

export const metadata: Metadata = {
  title: {
    default: 'Reservation Htao Andolan',
    template: '%s | Reservation Htao Andolan',
  },
  description: 'A premium movement platform for fair and equal opportunity for all.',
  metadataBase: new URL('https://movement.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Reservation Htao Andolan',
    description: 'A premium movement platform for fair and equal opportunity for all.',
    url: '/',
    type: 'website',
    locale: 'en_US',
    siteName: 'Reservation Htao Andolan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reservation Htao Andolan',
    description: 'A premium movement platform for fair and equal opportunity for all.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {children}
      </body>
    </html>
  );
}
