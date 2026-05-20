import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { AccessibilityButton } from '@/components/ui/AccessibilityButton';

export const metadata: Metadata = {
  title: 'Rebirth | Designer Clothing',
  description: 'Premium streetwear. Authenticity. Discipline. Stoicism. Personal evolution.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=UnifrakturMaguntia&family=Sofia+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sofia">
        <Providers>
          {children}
          <AccessibilityButton />
        </Providers>
      </body>
    </html>
  );
}