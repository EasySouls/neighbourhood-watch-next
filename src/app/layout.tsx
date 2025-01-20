import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import { HEADER_HEIGHT } from '@/lib/constants';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Neighbourhood Watch',
    default: 'Neighbourhood Watch',
  },
  description: 'Manage your civil guards and duties with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='hu'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col overflow-hidden`}
        style={{ '--header-height': HEADER_HEIGHT } as React.CSSProperties}
      >
        <div className='flex-1 flex flex-col h-full'>
          <Header />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
