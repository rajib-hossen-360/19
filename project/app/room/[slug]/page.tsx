'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Star,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Check,
  Sparkles,
} from 'lucide-react';
import { ROOM_CATEGORIES, ALL_PRODUCTS, Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function RoomPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const category = ROOM_CATEGORIES[slug];

  const { favorites, toggleFavorite, addSample, samples } = useCart();
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  if (!category) {
    return (
      <div className="max-w-[1360px] mx-auto px-6 py-20 text-center">
        <h1 className="font-editorial text-4xl text-stone-900">Room Not Found</h1>
        <p className="text-sm text-stone-500 mt-2">Explore our available rooms below:</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {Object.values(ROOM_CATEGORIES).map((r) => (
            <Link key={r.slug} href={`/room/${r.slug}`} className="px-4 py-2 rounded-full border border-stone-300 text-xs font-semibold hover:border-[#1e5b55] hover:text-[#1e5b55]">
              {r.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Filter products matching this room
  const roomProducts = useMemo(() => {
    let prods = ALL_PRODUCTS.filter((p) => p.rooms.includes(slug as any));
    if (prods.length === 0) {
      prods = ALL_PRODUCTS.slice(0, 8);
    }
    if (selectedMaterial !== 'all') {
      prods = prods.filter((p) => p.material.toLowerCase() === selectedMaterial.toLowerCase());
    }
    if (selectedFinish !== 'all') {
      prods = prods.filter((p) => p.finish.toLowerCase() === selectedFinish.toLowerCase());
    }
    if (sortBy === 'price-asc') {
      prods = [...prods].sort((a, b) => a.pricePerSqFt - b.pricePerSqFt);
    } else if (sortBy === 'price-desc') {
      prods = [...prods].sort((a, b) => b.pricePerSqFt - a.pricePerSqFt);
    } else if (sortBy === 'rating') {
      prods = [...prods].sort((a, b) => b.rating - a.rating);
    }
    return prods;
  }, [slug, selectedMaterial, selectedFinish, sortBy]);

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-3 text-[11px] text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-stone-400">Room</span>
        <span>&rsaquo;</span>
        <span className="text-stone-900 font-semibold">{category.title}</span>
      </div>

      {/* Room Hero Banner */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[440px_1fr] gap-6 lg:gap-10 items-center bg-[#faf9f6] p-6 sm:p-8 rounded-2xl border border-[#ece7dc]">
          <div className="h-[220px] sm:h-[260px] rounded-xl overflow-hidden shadow-sm">
            <img src={category.heroImage} alt={category.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e5b55] block mb-1">
              Room Guide &amp; Catalog
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
              {category.headline}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
              {category.description}
            </p>

            {/* Subcategories */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              {category.subcategories.map((sub) => (
                <div key={sub.name} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-stone-200 text-xs text-stone-800 shadow-2xs">
                  <img src={sub.image} alt={sub.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="font-medium text-[11px]">{sub.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid & Filters */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-200 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <span className="text-xs font-medium text-stone-500">
              Showing <span className="font-bold text-stone-900">{roomProducts.length}</span> tiles in {category.title}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label className="text-stone-500">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 outline-none focus:border-stone-500"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 pt-6">
          {/* Filter Sidebar */}
          <aside className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block space-y-6 text-xs`}>
            <div>
              <h4 className="font-bold uppercase tracking-wider text-[11px] text-stone-900 mb-3">
                Material
              </h4>
              <div className="space-y-1.5 text-stone-600">
                {['all', 'Wood-Look Porcelain', 'Luxury Vinyl (LVP)', 'Porcelain', 'Ceramic', 'Marble', 'Slate', 'Travertine'].map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                      selectedMaterial === mat
                        ? 'bg-[#1e5b55] text-white font-semibold'
                        : 'hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {mat === 'all' ? 'All Materials' : mat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <h4 className="font-bold uppercase tracking-wider text-[11px] text-stone-900 mb-3">
                Surface Finish
              </h4>
              <div className="space-y-1.5 text-stone-600">
                {['all', 'Glossy', 'Matte', 'Polished', 'Honed'].map((fin) => (
                  <button
                    key={fin}
                    onClick={() => setSelectedFinish(fin)}
                    className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                      selectedFinish === fin
                        ? 'bg-[#1e5b55] text-white font-semibold'
                        : 'hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {fin === 'all' ? 'All Finishes' : fin}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 bg-[#f7f6f2] p-4 rounded-xl border border-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1e5b55] block">
                Direct $3 Samples
              </span>
              <p className="text-[11px] text-stone-600 mt-1">
                Touch and see each tile in your own space before committing to a full project order.
              </p>
            </div>
          </aside>

          {/* Product Grid */}
          <div>
            {roomProducts.length === 0 ? (
              <div className="py-20 text-center text-sm text-stone-500">
                No tiles match your current filter selection. Try clearing filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomProducts.map((prod) => {
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
            )}
          </div>
        </div>
      </section>

      {/* Room FAQs & Guide */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 mt-16 pt-12 border-t border-stone-200">
        <h2 className="font-editorial text-2xl sm:text-3xl text-stone-900 mb-6">
          Frequently Asked Questions About {category.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.faqs.map((faq) => (
            <div key={faq.q} className="bg-[#faf9f6] p-5 rounded-xl border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 mb-2">{faq.q}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
