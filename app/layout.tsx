import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Klara — Your pension, clearly.',
  description: 'Latvian pension and personal finance aggregator prototype.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
