'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Heart, ShoppingBag, Check, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ALL_PRODUCTS, Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

const COLLECTION_METAS: Record<string, { title: string; headline: string; subtitle: string; description: string }> = {
  'best-sellers': {
    title: 'Featured Tiles & Best Sellers',
    headline: 'Featured Tiles & Best Sellers',
    subtitle: 'Order $3 Direct Samples',
    description: 'Explore the nation’s most loved kitchen, bath, and floor tiles. Test in your home with $3 direct sample cut pieces delivered to your doorstep.',
  },
  'new-arrivals': {
    title: 'New Arrival Tiles',
    headline: 'New Arrival Tiles & Trends',
    subtitle: 'Fresh 2026 Releases',
    description: 'Be the first to explore groundbreaking porcelain panel slabs, artisanal glazes, and modern geometric tiles.',
  },
  'checkerboard': {
    title: 'Checkerboard Pairings',
    headline: 'Timeless Checkerboard Tiles',
    subtitle: 'Pre-Paired Contrasting Patterns',
    description: 'Curated pairings of contrasting black, white, and grey honed tiles ready to install on straight or diagonal grids.',
  },
  'porcelain-slabs': {
    title: 'Porcelain Panel Kits',
    headline: 'Seamless Large-Format Shower Slabs',
    subtitle: 'Grout-Free Shower Wall Panels',
    description: 'Eliminate 70% of grout lines with expansive 24x48 in. and oversized porcelain slabs engineered for showers and statement floors.',
  },
  'tiles-under-7': {
    title: 'Tile Under $7',
    headline: 'Budget-Friendly Designer Tiles',
    subtitle: 'Affordable Luxury Everyday',
    description: 'High quality ceramic and porcelain tile collections designed to maximize your renovation budget without sacrificing beauty.',
  },
};

export default function FeaturedCollectionPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'best-sellers';
  const meta = COLLECTION_METAS[slug] || {
    title: 'Featured Tiles & Best Sellers',
    headline: 'Featured Tiles & Best Sellers',
    subtitle: 'Order $3 Direct Samples',
    description: 'Explore hand-selected luxury tiles crafted for durability and timeless distinction.',
  };

  const { favorites, toggleFavorite, addSample, samples } = useCart();
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'marble' | 'subway' | 'floor'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    let list = ALL_PRODUCTS.filter((prod) => {
      // If collection-specific page other than best-sellers, filter by collection first
      if (slug !== 'best-sellers') {
        if (prod.collection !== slug) return false;
      }

      if (activeTab === 'all') return true;
      if (activeTab === 'trending') return prod.collection === 'best-sellers' || Boolean(prod.badge);
      if (activeTab === 'marble') return prod.material === 'Marble' || prod.material === 'Porcelain';
      if (activeTab === 'subway') return prod.size.includes('x 10') || prod.size.includes('x 8') || prod.size.includes('x 12');
      if (activeTab === 'floor') return prod.application.includes('Floor');
      return true;
    });

    if (list.length === 0) {
      list = ALL_PRODUCTS;
    }

    if (sortBy === 'price-low') {
      return [...list].sort((a, b) => a.pricePerSqFt - b.pricePerSqFt);
    }
    if (sortBy === 'price-high') {
      return [...list].sort((a, b) => b.pricePerSqFt - a.pricePerSqFt);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [slug, activeTab, sortBy]);

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Breadcrumbs */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-3 text-[11px] text-stone-500 flex items-center gap-2 border-b border-stone-100">
        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-stone-400">Featured</span>
        <span>&rsaquo;</span>
        <span className="text-stone-900 font-semibold">{meta.title}</span>
      </div>

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-12">
        {/* Hero Header matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e5b55] block">
              {meta.subtitle}
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl font-normal text-stone-900 mt-1">
              {meta.headline}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              {meta.description}
            </p>
          </div>

          {/* Filter Tabs matching screenshot */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            {[
              { id: 'all', label: 'All Tiles' },
              { id: 'trending', label: 'Trending' },
              { id: 'marble', label: 'Marble Look' },
              { id: 'subway', label: 'Subway & Artisan' },
              { id: 'floor', label: 'Floor & Wall' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1e5b55] text-white border-[#1e5b55] shadow-sm'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Counter & Sorting */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
          <p>
            Showing <span className="font-semibold text-stone-900">{filteredProducts.length}</span> tiles in this collection
          </p>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-stone-400" />
            <span className="text-stone-600 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 bg-white outline-none focus:border-[#1e5b55]"
            >
              <option value="featured">Featured / Best Match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const isFav = favorites.includes(prod.id);
            const isSampleAdded = samples.some((s) => s.id === prod.id);

            return (
              <article
                key={prod.id}
                className="group relative bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-stone-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-[#f4f2ee]">
                  <Link href={`/product/${prod.id}`}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />
                  </Link>

                  <button
                    onClick={() => toggleFavorite(prod.id)}
                    aria-label="Save to Wishlist"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-600 shadow-sm transition-all"
                  >
                    <Heart
                      size={16}
                      className={isFav ? 'fill-[#aa3e35] text-[#aa3e35]' : 'hover:text-red-500'}
                    />
                  </button>

                  {prod.badge && (
                    <span className="absolute bottom-3 left-3 bg-[#111111]/85 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-500 mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                        ))}
                      </div>
                      <span className="font-semibold text-stone-800">{prod.rating.toFixed(1)}</span>
                      <span className="text-stone-400">({prod.reviewsCount})</span>
                    </div>

                    <Link href={`/product/${prod.id}`}>
                      <h3 className="text-xs font-semibold text-stone-900 group-hover:text-[#1e5b55] transition-colors line-clamp-2 min-h-[32px] cursor-pointer">
                        {prod.name}
                      </h3>
                    </Link>

                    <p className="text-[11px] text-stone-500 mt-1">{prod.size} &bull; {prod.material}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-stone-900">
                        ${prod.pricePerSqFt.toFixed(2)}{' '}
                        <span className="text-[10px] font-normal text-stone-500">/ sq. ft.</span>
                      </div>
                    </div>

                    <button
                      onClick={() => addSample(prod)}
                      className={`text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                        isSampleAdded
                          ? 'bg-[#edf6f4] text-[#1e5b55] border border-[#1e5b55]'
                          : 'bg-white hover:bg-[#f6fbf9] text-stone-800 border border-stone-300 hover:border-[#1e5b55]'
                      }`}
                    >
                      {isSampleAdded ? (
                        <>
                          <Check size={12} /> In Samples
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={12} /> Add Sample $3
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Sample Direct Callout */}
        <div className="mt-16 bg-[#faf9f6] rounded-2xl border border-stone-200 p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1e5b55]">
            Risk-Free Tile Shopping
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Order $3 Samples &amp; See Them in Your Home Lighting
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Tile lighting changes dramatically between showroom lighting and your home. Order standard cuts of any tile above for only $3 each with fast direct doorstep delivery.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="bg-[#1e5b55] hover:bg-[#184843] text-white px-6 py-2.5 rounded-full text-xs font-semibold transition-all"
            >
              Browse All Spaces &amp; Rooms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
