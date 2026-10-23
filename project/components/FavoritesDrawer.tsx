'use client';

import { Heart, X, ShoppingBag, ArrowRight, Trash2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ALL_PRODUCTS, Product } from '@/lib/data';

export default function FavoritesDrawer() {
  const {
    favorites,
    toggleFavorite,
    clearFavorites,
    addSample,
    isFavoritesDrawerOpen,
    setIsFavoritesDrawerOpen,
    setIsSampleDrawerOpen,
  } = useCart();

  if (!isFavoritesDrawerOpen) return null;

  // Resolve product objects from IDs
  const favoriteProducts: Product[] = favorites
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const handleAddAllToSamples = () => {
    favoriteProducts.forEach((product) => {
      addSample(product);
    });
    setIsFavoritesDrawerOpen(false);
    setIsSampleDrawerOpen(true);
  };

  return (
    <div
      onClick={() => setIsFavoritesDrawerOpen(false)}
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300 cursor-default"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#aa3e35]">
              <Heart size={18} className="fill-[#aa3e35]" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold text-stone-900 leading-tight">
                Saved Wishlist
              </h3>
              <p className="text-[11px] text-stone-500">
                {favorites.length} {favorites.length === 1 ? 'tile saved' : 'tiles saved'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFavoritesDrawerOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Close wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Tile List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Heart size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="font-editorial text-xl font-bold text-stone-800">
                  Your Wishlist is Empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Tap the heart icon on any tile to save your favorite colors, textures, and patterns for your project.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="/featured/best-sellers"
                  onClick={() => setIsFavoritesDrawerOpen(false)}
                  className="block w-full bg-[#1e5b55] hover:bg-[#184843] text-white py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm"
                >
                  Explore Best Sellers
                </Link>
                <Link
                  href="/room/bathroom"
                  onClick={() => setIsFavoritesDrawerOpen(false)}
                  className="block w-full bg-stone-100 hover:bg-stone-200 text-stone-800 py-2.5 rounded-full text-xs font-semibold transition-all"
                >
                  Browse Bathroom Tiles
                </Link>
                <Link
                  href="/room/kitchen"
                  onClick={() => setIsFavoritesDrawerOpen(false)}
                  className="block w-full bg-stone-100 hover:bg-stone-200 text-stone-800 py-2.5 rounded-full text-xs font-semibold transition-all"
                >
                  Browse Kitchen &amp; Backsplash
                </Link>
              </div>
            </div>
          ) : (
            favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 items-center border border-stone-200 p-3 rounded-xl bg-stone-50 hover:bg-white hover:border-stone-300 transition-all shadow-xs group"
              >
                <Link
                  href={`/product/${product.id}`}
                  onClick={() => setIsFavoritesDrawerOpen(false)}
                  className="shrink-0 overflow-hidden rounded-lg border border-stone-200"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#1e5b55] bg-emerald-50 px-1.5 py-0.5 rounded">
                      {product.material}
                    </span>
                    {product.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/product/${product.id}`}
                    onClick={() => setIsFavoritesDrawerOpen(false)}
                  >
                    <h4 className="text-xs font-bold text-stone-900 truncate hover:text-[#1e5b55] transition-colors">
                      {product.name}
                    </h4>
                  </Link>

                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>{product.size}</span>
                    <span className="font-bold text-stone-900">
                      ${product.pricePerSqFt.toFixed(2)} / sq.ft.
                    </span>
                  </div>

                  {/* Actions for this item */}
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={() => addSample(product)}
                      className="flex-1 bg-[#1e5b55] hover:bg-[#184843] text-white py-1.5 px-2.5 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <ShoppingBag size={12} />
                      <span>Order $3 Sample</span>
                    </button>

                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove from favorites"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoriteProducts.length > 0 && (
          <div className="pt-4 border-t border-stone-200 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Saved for project</span>
              <span className="font-bold text-stone-900">{favoriteProducts.length} items</span>
            </div>

            <button
              onClick={handleAddAllToSamples}
              className="w-full bg-[#1e5b55] hover:bg-[#184843] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <ShoppingBag size={15} />
              <span>Order Samples for All ({favoriteProducts.length} x $3)</span>
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={clearFavorites}
                className="text-[11px] text-stone-400 hover:text-red-600 transition-colors"
              >
                Clear all saved tiles
              </button>

              <Link
                href="/featured/best-sellers"
                onClick={() => setIsFavoritesDrawerOpen(false)}
                className="text-[11px] text-[#1e5b55] hover:underline flex items-center gap-0.5 font-medium"
              >
                <span>Find more tiles</span>
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
