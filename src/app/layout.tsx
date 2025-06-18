import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/providers/Providers';

export const metadata: Metadata = {
  title: 'E-commerce App',
  description: 'A modern e-commerce application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
