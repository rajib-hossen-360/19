'use client';

import { ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function SampleDrawer() {
  const { samples, removeSample, isSampleDrawerOpen, setIsSampleDrawerOpen } = useCart();

  if (!isSampleDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#1e5b55]" size={20} />
            <h3 className="font-editorial text-2xl font-bold text-stone-900">Your Tile Samples</h3>
          </div>
          <button
            onClick={() => setIsSampleDrawerOpen(false)}
            className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {samples.length === 0 ? (
            <div className="text-center py-16 text-stone-400 text-xs">
              Your sample tray is empty. Add samples from any tile product for just $3 each.
            </div>
          ) : (
            samples.map((item) => (
              <div key={item.id} className="flex gap-3 items-center border border-stone-100 p-3 rounded-lg bg-stone-50">
                <Link href={`/product/${item.id}`} onClick={() => setIsSampleDrawerOpen(false)}>
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover cursor-pointer hover:opacity-90" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.id}`} onClick={() => setIsSampleDrawerOpen(false)}>
                    <h4 className="text-xs font-semibold text-stone-900 truncate hover:text-[#1e5b55] transition-colors">
                      {item.name}
                    </h4>
                  </Link>
                  <p className="text-[11px] text-stone-500">{item.size}</p>
                  <span className="text-xs font-bold text-[#1e5b55]">$3.00 Sample</span>
                </div>
                <button
                  onClick={() => removeSample(item.id)}
                  className="text-stone-400 hover:text-red-500 p-1"
                  aria-label="Remove item"
                >
                  <X size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {samples.length > 0 && (
          <div className="pt-4 border-t border-stone-200 space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span>Samples Subtotal:</span>
              <span>${(samples.length * 3).toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-stone-500">
              Samples arrive in 2–3 business days with free standard shipping.
            </p>
            <button
              onClick={() => alert(`Ordering ${samples.length} sample(s) for $${(samples.length * 3).toFixed(2)}. Checkout completed!`)}
              className="w-full bg-[#1e5b55] hover:bg-[#184843] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              Checkout Samples
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
