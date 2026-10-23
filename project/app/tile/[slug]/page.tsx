'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { ALL_PRODUCTS, Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function TileSlugPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'clearance';

  const isClearance = slug === 'clearance';
  const meta = isClearance
    ? {
        title: 'Clearance Tile Sale',
        headline: 'Clearance & Closeout Tiles — Up to 50% Off',
        description: 'Explore limited inventory natural stone, discontinued porcelain pavers, and discounted artisanal tiles while supplies last.',
      }
    : {
        title: 'New Tile Arrivals',
        headline: 'Brand New Tile Arrivals for 2026',
        description: 'Discover the latest porcelain slabs, handmade glazes, and modern geometric tiles freshly added to our collection.',
      };

  const { favorites, toggleFavorite, addSample, samples } = useCart();

  const products = useMemo(() => {
    if (isClearance) {
      return ALL_PRODUCTS.filter((p) => p.collection === 'clearance' || p.pricePerSqFt < 10);
    }
    return ALL_PRODUCTS.filter((p) => p.collection === 'new-arrivals' || p.collection === 'best-sellers');
  }, [isClearance]);

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-3 text-[11px] text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-stone-400">Tile</span>
        <span>&rsaquo;</span>
        <span className="text-stone-900 font-semibold">{meta.title}</span>
      </div>

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className={`p-8 sm:p-12 rounded-2xl border text-center max-w-4xl mx-auto mb-12 ${
          isClearance ? 'bg-amber-50/50 border-amber-200' : 'bg-[#faf9f6] border-stone-200'
        }`}>
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block mb-1 ${
            isClearance ? 'text-[#aa3e35]' : 'text-[#1e5b55]'
          }`}>
            {isClearance ? 'Special Clearance Pricing' : 'New Season Release'}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-normal text-stone-900 leading-tight">
            {meta.headline}
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            {meta.description}
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => {
            const isFav = favorites.includes(prod.id);
            const isSampleAdded = samples.some((s) => s.id === prod.id);

            return (
              <article
                key={prod.id}
                className="group relative bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg hover:border-stone-400 transition-all duration-300 flex flex-col justify-between"
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
      </section>
    </div>
  );
}
