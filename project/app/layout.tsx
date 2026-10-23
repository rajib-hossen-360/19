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
      { url: '/fav-icon.png' },
      { url: '/fav-icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/fav-icon.png', sizes: '16x16', type: 'image/png' },
      { url: '/fav-icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/fav-icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/fav-icon.png',
    apple: [
      { url: '/fav-icon.png' },
      { url: '/fav-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/fav-icon.png" />
        <link rel="shortcut icon" type="image/png" href="/fav-icon.png" />
        <link rel="apple-touch-icon" href="/fav-icon.png" />
      </head>
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
