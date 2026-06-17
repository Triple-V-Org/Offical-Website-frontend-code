import type { Metadata, Viewport } from 'next';
import { Inter, Hanken_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

// Headline face — same clean family feel as Inter, a touch more character.
const display = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Figwork — Build a network to land your next job',
  description:
    'Figwork helps you build the network that lands your next job. Connect with recruiters across 50k companies actively hiring.',
  icons: {
    icon: '/img/favicon.png',
    apple: '/img/favicon.png',
  },
  openGraph: {
    title: 'Figwork — Build a network to land your next job',
    description:
      'Connect with recruiters across 50k companies actively hiring.',
    url: 'https://figwork.info',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Figwork — Build a network to land your next job',
    description:
      'Connect with recruiters across 50k companies actively hiring.',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1512',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
