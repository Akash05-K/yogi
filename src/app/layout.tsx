import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Yogi Astro | Clarity for your journey',
  description:
    'Personalised Vedic astrology and marriage compatibility consultations. Connect online in Tamil, Telugu or English with Yogi Astro.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
