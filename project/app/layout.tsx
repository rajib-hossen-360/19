import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SampleDrawer from '@/components/SampleDrawer';
import FavoritesDrawer from '@/components/FavoritesDrawer';

export const metadata: Metadata = {
  title: 'The Tile Shop - High Quality Floor & Wall Tile',
  description: 'Shop our wide selection of tiles for kitchens, bathrooms & more. Explore high-quality floor & wall tile collections with easy sample ordering and fast delivery.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#1f201e] flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <SampleDrawer />
          <FavoritesDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
