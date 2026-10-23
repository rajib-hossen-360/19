'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Check,
  ShieldCheck,
  Truck,
  Palette,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

const SHOP_BY_SPACE = [
  {
    title: 'Kitchen',
    link: '/room/kitchen',
    img: 'https://s7d1.scene7.com/is/image/TileShop/683320_render_kitchen_close_up_vertical:1x1?fmt=webp',
  },
  {
    title: 'Bathroom',
    link: '/room/bathroom',
    img: 'https://s7d1.scene7.com/is/image/TileShop/484940_50_REN:1x1?fmt=webp',
  },
  {
    title: 'Backsplash',
    link: '/room/backsplash',
    img: 'https://s7d1.scene7.com/is/image/TileShop/FoxHomes_FitFoodie_%20Kitchen_Vertical_V2:1x1?fmt=webp',
  },
  {
    title: 'Shower',
    link: '/room/shower',
    img: 'https://s7d1.scene7.com/is/image/TileShop/LayeredShower_View1_2:1x1?fmt=webp',
  },
  {
    title: 'Outdoor',
    link: '/room/outdoor',
    img: 'https://s7d1.scene7.com/is/image/TileShop/682076_50_REN:1x1?fmt=webp',
  },
  {
    title: 'Laundry',
    link: '/room/laundry',
    img: 'https://s7d1.scene7.com/is/image/TileShop/Timber_Trails_Napa_Laundry_001:1x1?fmt=webp',
  },
];

const FEATURED_COLLECTIONS = [
  {
    title: 'New Arrivals',
    img: 'https://s7d1.scene7.com/is/image/TileShop/Homepage_April2026_NewArrivals:3x2?fmt=png-alpha&fmt=webp',
    cta: 'SHOP NOW',
    link: '/featured/new-arrivals',
    tag: 'Fresh Styles',
  },
  {
    title: 'Best Sellers',
    img: 'https://s7d1.scene7.com/is/image/TileShop/Homepage_June2026_BestSellers:3x2?fmt=png-alpha&fmt=webp',
    cta: 'SHOP NOW',
    link: '/featured/best-sellers',
    tag: 'Customer Favorites',
  },
  {
    title: 'Porcelain Panel Kits',
    img: 'https://s7d1.scene7.com/is/image/TileShop/Homepage_December2025_PorcelainPanel:3x2?fmt=png-alpha&fmt=webp',
    cta: 'SHOP NOW',
    link: '/featured/porcelain-slabs',
    tag: 'Grout-Free Shower Kits',
  },
  {
    title: 'Checkerboard Pairings',
    img: 'https://s7d1.scene7.com/is/image/TileShop/Homepage_June2026_Checkerboard:3x2?fmt=png-alpha&fmt=webp',
    cta: 'SHOP NOW',
    link: '/featured/checkerboard',
    tag: 'Timeless Pattern',
  },
  {
    title: 'Clearance Tile',
    img: 'https://s7d1.scene7.com/is/image/TileShop/Homepage_April2026_Clearance:3x2?fmt=png-alpha&fmt=webp',
    cta: 'SHOP NOW',
    link: '/tile/clearance',
    tag: 'Up to 50% Off',
  },
  {
    title: 'Tile Under $7',
    img: 'https://s7d1.scene7.com/is/image/TileShop/Homepage_April2026_TileUnder7:16x9?fmt=png-alpha&fmt=webp',
    cta: 'SHOP NOW',
    link: '/featured/tiles-under-7',
    tag: 'Budget Friendly',
  },
];

const INSPIRATION_CARDS = [
  {
    title: 'Tile Ideas & Design',
    desc: 'Explore curated galleries and real-world project transformations.',
    img: 'https://s7d1.scene7.com/is/image/TileShop/Q12025_NewArrivals_White_Vertical_V2:1x1?fmt=webp',
    cta: 'Explore Bathroom Ideas',
    href: '/room/bathroom',
  },
  {
    title: 'Kitchen & Backsplash Gallery',
    desc: 'Tips from top interior designers on tile trends, colors, and grout matching.',
    img: 'https://s7d1.scene7.com/is/image/TileShop/TimberTrails_ChefsDelight_Kitchen_002:1x1?fmt=webp',
    cta: 'Explore Kitchen Ideas',
    href: '/room/kitchen',
  },
  {
    title: 'Shower & Mudroom Inspiration',
    desc: 'Step-by-step installation guides, grouting tips, and maintenance tutorials.',
    img: 'https://s7d1.scene7.com/is/image/TileShop/TimberTrails_ChefsDelight_Mudroom_004:1x1?fmt=webp',
    cta: 'Explore Shower Ideas',
    href: '/room/shower',
  },
];

export default function HomePage() {
  const { favorites, toggleFavorite, addSample, samples } = useCart();

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION: NATE BERKUS COLLECTION SPOTLIGHT */}
      <section className="relative overflow-hidden bg-[#181917] text-white min-h-[500px] lg:min-h-[580px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/7018379/pexels-photo-7018379.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
            alt="Nate Berkus Designer Tile Installation"
            className="w-full h-full object-cover object-center opacity-45 transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-200 mb-5">
            <Sparkles size={13} className="text-amber-300" />
            Exclusive Designer Series
          </span>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08] max-w-3xl">
            Nate Berkus <span className="italic font-light">x</span> The Tile Shop
          </h1>

          <p className="mt-4 text-stone-200 text-sm sm:text-base max-w-xl font-light leading-relaxed">
            Timeless silhouettes, handcrafted finishes, and architectural checkerboard tiles designed to bring effortless warmth to any room.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/featured/checkerboard"
              className="bg-white text-stone-900 hover:bg-stone-100 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              EXPLORE THE COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY SPACE (Cards click directly to inner room pages!) */}
      <section id="spaces" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <h2 className="text-center font-normal text-xl sm:text-2xl md:text-3xl text-stone-900 mb-8 sm:mb-10 font-sans tracking-tight">
          Shop by Space
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-start">
          {SHOP_BY_SPACE.map((space) => (
            <Link
              key={space.title}
              href={space.link}
              className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                <img
                  src={space.img}
                  alt={space.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-3 text-sm sm:text-base font-normal text-stone-900 group-hover:font-semibold group-hover:text-[#1e5b55] transition-all">
                {space.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. ROOM VISUALIZER BANNER */}
      <section id="visualizer" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <Link href="/room/backsplash">
          <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-stone-200">
            <img
              src="https://s7d1.scene7.com/is/image/TileShop/Banner_Roomvo_Zellige_Desktop:Banner-Desktop-2x?fmt=png-alpha&fmt=webp"
              alt="Visualizer - Try Tile in Your Space"
              className="w-full h-[240px] sm:h-[340px] lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
              <div className="max-w-xl">
                <span className="inline-block bg-[#1e5b55] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Featured Space
                </span>
                <h3 className="font-editorial text-2xl sm:text-4xl font-normal leading-tight">
                  Handcrafted Zellige &amp; Artisan Glazes
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-200 max-w-md hidden sm:block">
                  Discover rich reflective textures that elevate backsplashes, shower walls, and bathroom accents with Old World warmth.
                </p>
                <div className="mt-5 flex gap-3">
                  <span className="bg-white text-stone-900 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 group-hover:gap-2.5">
                    Explore Backsplash Tiles <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>


      {/* 5. CURATED FEATURED COLLECTIONS (Clicking each card opens its inner page!) */}
      <section id="collections" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e5b55]">
              Trending Now
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 mt-1">
              Featured Collections
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-sm">
            From dramatic oversized panels to curated value tiles, explore our most coveted releases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_COLLECTIONS.map((col) => (
            <Link
              key={col.title}
              href={col.link}
              className="group relative rounded-2xl overflow-hidden min-h-[300px] sm:min-h-[340px] bg-stone-900 shadow-md border border-stone-200 cursor-pointer block"
            >
              <img
                src={col.img}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-1">
                  {col.tag}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-normal leading-snug">
                  {col.title}
                </h3>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-white text-stone-900 text-xs font-bold uppercase px-5 py-2.5 rounded-full group-hover:bg-stone-100 transition-all group-hover:gap-2.5 shadow">
                    {col.cta} <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. MARBLE MATCH BANNER */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <Link href="/featured/best-sellers">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 group cursor-pointer">
            <img
              src="https://s7d1.scene7.com/is/image/TileShop/Banner_MarbleMatch_Desktop:Banner-Desktop-2x?fmt=png-alpha&fmt=webp"
              alt="Marble Match - Coordinate trims and tile"
              className="w-full h-[220px] sm:h-[300px] object-cover transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-6 sm:p-12 text-white">
              <div className="max-w-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#55c1b6] mb-1 block">
                  Finishing Touches
                </span>
                <h3 className="font-editorial text-2xl sm:text-4xl text-white font-normal">
                  Marble Match™ Trims &amp; Sills
                </h3>
                <p className="text-xs text-stone-200 mt-2 leading-relaxed">
                  Never guess on trim colors again. Marble Match coordinates seamlessly with our porcelain, marble, and ceramic collections.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-white text-stone-900 text-xs font-bold uppercase px-6 py-2.5 rounded-full group-hover:bg-stone-100 transition-all">
                    SHOP MARBLE MATCH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* 8. TILE INSPIRATION CARDS (Links to room pages!) */}
      <section id="inspiration" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e5b55]">
            Expert Guidance
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 mt-1">
            Tile Ideas &amp; Inspiration
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Explore curated design galleries, renovation stories, and room inspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSPIRATION_CARDS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all block"
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-editorial text-xl font-bold text-stone-900 group-hover:text-[#1e5b55] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#1e5b55] group-hover:gap-2.5 transition-all">
                  {item.cta} <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. GET INSPIRED - SOCIAL GALLERY */}
      <section className="bg-[#f9f8f5] border-t border-b border-[#ece7dd] py-14">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e5b55]">
            Real Customer Spaces
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 mt-1">
            Get Inspired #MyTileShop
          </h2>
          <p className="text-xs text-stone-600 mt-2 max-w-lg mx-auto">
            Click any customer space to explore recommended tile selections.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { img: 'https://images.pexels.com/photos/9598153/pexels-photo-9598153.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', link: '/room/kitchen' },
              { img: 'https://images.pexels.com/photos/11285516/pexels-photo-11285516.png?auto=compress&cs=tinysrgb&h=400&w=400', link: '/room/bathroom' },
              { img: 'https://images.pexels.com/photos/29252363/pexels-photo-29252363.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', link: '/room/shower' },
              { img: 'https://images.pexels.com/photos/17497857/pexels-photo-17497857.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', link: '/room/outdoor' },
              { img: 'https://images.pexels.com/photos/11285344/pexels-photo-11285344.png?auto=compress&cs=tinysrgb&h=400&w=400', link: '/room/laundry' },
              { img: 'https://images.pexels.com/photos/27573422/pexels-photo-27573422.jpeg?auto=compress&cs=tinysrgb&h=400&w=400', link: '/room/backsplash' },
            ].map((space, i) => (
              <Link key={i} href={space.link} className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer shadow-sm block">
                <img
                  src={space.img}
                  alt="Customer Tile Installation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                  <span>Explore Space</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. VALUE PROPOSITION BAR */}
      <section className="hidden md:block bg-white py-10 border-b border-stone-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 bg-[#f5f4ef] rounded-full text-[#1e5b55]">
              <Palette size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Curated Design Ideas</h4>
              <p className="text-[11px] text-stone-500">Inspiring palettes &amp; installation guides</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 bg-[#f5f4ef] rounded-full text-[#1e5b55]">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">$3 Tile Samples</h4>
              <p className="text-[11px] text-stone-500">Shipped straight to your doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 bg-[#f5f4ef] rounded-full text-[#1e5b55]">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Job-Site Delivery</h4>
              <p className="text-[11px] text-stone-500">Fast, reliable curbside delivery nationwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-3 bg-[#f5f4ef] rounded-full text-[#1e5b55]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Tile Experts Since 1985</h4>
              <p className="text-[11px] text-stone-500">Premium quality and craftsmanship</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
