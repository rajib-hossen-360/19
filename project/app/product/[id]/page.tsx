'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || '1';

  const product = ALL_PRODUCTS.find((p) => p.id === id) || ALL_PRODUCTS[0];

  const { favorites, toggleFavorite, addSample, samples } = useCart();
  const isFav = favorites.includes(product.id);
  const isSampleAdded = samples.some((s) => s.id === product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [projectSqFt, setProjectSqFt] = useState(100);
  const [includeOverage, setIncludeOverage] = useState(true);
  const [boxQuantity, setBoxQuantity] = useState(10);

  // Calculate box requirements
  const totalCoverageSqFt = includeOverage ? Math.ceil(projectSqFt * 1.1) : projectSqFt;
  const recommendedBoxes = Math.ceil(totalCoverageSqFt / product.boxSqFt);
  const totalProjectPrice = (recommendedBoxes * product.boxSqFt * product.pricePerSqFt).toFixed(2);
  const boxPrice = (product.pricePerSqFt * product.boxSqFt).toFixed(2);

  // Related products
  const relatedProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-3 text-[11px] text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <Link href={`/room/${product.rooms[0] || 'bathroom'}`} className="capitalize hover:text-stone-900 transition-colors">
          {product.rooms[0] || 'Bathroom'} Tile
        </Link>
        <span>&rsaquo;</span>
        <span className="text-stone-900 font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14">
          {/* Gallery Column */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#f4f2ee] border border-stone-200">
              <img
                src={product.images[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                aria-label="Save to Wishlist"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow transition-all"
              >
                <Heart size={18} className={isFav ? 'fill-[#aa3e35] text-[#aa3e35]' : ''} />
              </button>
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#1e5b55] shadow-sm' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Ordering Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-500 text-xs">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="font-bold text-stone-900">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">({product.reviewsCount} customer reviews)</span>
              <span className="text-stone-300">&bull;</span>
              <span className="text-stone-500 font-mono text-[11px]">SKU: {product.specs.sku}</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal mt-2 leading-snug">
              {product.name}
            </h1>

            <p className="text-xs text-stone-500 mt-1">
              Nominal Size: <span className="font-semibold text-stone-800">{product.size}</span> &bull; Finish: <span className="font-semibold text-stone-800">{product.finish}</span> &bull; Material: <span className="font-semibold text-stone-800">{product.material}</span>
            </p>

            {/* Pricing Section */}
            <div className="mt-5 p-5 bg-[#faf9f6] rounded-xl border border-stone-200">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-stone-900">
                  ${product.pricePerSqFt.toFixed(2)}
                </span>
                <span className="text-xs text-stone-500">/ sq. ft.</span>
                <span className="text-xs font-semibold text-stone-700 ml-auto">
                  ${boxPrice} / box <span className="font-normal text-stone-400">({product.boxSqFt} sq. ft.)</span>
                </span>
              </div>

              {/* Tile Square Footage Calculator */}
              <div className="mt-4 pt-4 border-t border-stone-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-800 mb-2">
                  <Calculator size={15} className="text-[#1e5b55]" />
                  <span>Square Footage Project Calculator</span>
                </div>
                <div className="grid grid-cols-2 gap-3 items-end">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Enter Area (sq. ft.):</label>
                    <input
                      type="number"
                      min="1"
                      value={projectSqFt}
                      onChange={(e) => setProjectSqFt(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 font-semibold text-stone-900 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 pb-2">
                    <input
                      type="checkbox"
                      id="overage"
                      checked={includeOverage}
                      onChange={(e) => setIncludeOverage(e.target.checked)}
                      className="accent-[#1e5b55] w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="overage" className="text-[11px] text-stone-600 cursor-pointer">
                      +10% cut &amp; waste overage
                    </label>
                  </div>
                </div>

                <div className="mt-3 bg-white p-3 rounded-lg border border-stone-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-stone-900">{recommendedBoxes} boxes</span> needed ({totalCoverageSqFt} sq. ft.)
                  </div>
                  <div className="font-bold text-stone-900 text-sm">
                    Est. Total: ${totalProjectPrice}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => alert(`Added ${recommendedBoxes} box(es) of ${product.name} to cart ($${totalProjectPrice}).`)}
                className="flex-1 bg-[#1e5b55] hover:bg-[#184843] text-white py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag size={15} /> Add {recommendedBoxes} Boxes to Cart
              </button>

              <button
                onClick={() => addSample(product)}
                className={`px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  isSampleAdded
                    ? 'bg-[#edf6f4] text-[#1e5b55] border border-[#1e5b55]'
                    : 'bg-white hover:bg-[#f6fbf9] text-stone-900 border border-stone-300 hover:border-[#1e5b55]'
                }`}
              >
                {isSampleAdded ? <><Check size={14} /> Sample Added</> : <><ShoppingBag size={14} /> Order $3 Sample</>}
              </button>
            </div>

            {/* Guarantee badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center border-t border-b border-stone-200 py-4 text-[11px] text-stone-600">
              <div className="flex flex-col items-center gap-1">
                <Truck size={17} className="text-[#1e5b55]" />
                <span>Job-Site Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={17} className="text-[#1e5b55]" />
                <span>Tile Shop Guaranteed</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={17} className="text-[#1e5b55]" />
                <span>30-Day Easy Returns</span>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="mt-8">
              <h3 className="font-editorial text-2xl font-bold text-stone-900 mb-3">
                Technical Specifications
              </h3>
              <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <tbody>
                    {[
                      ['Material', product.material],
                      ['Surface Finish', product.finish],
                      ['Thickness', product.specs.thickness],
                      ['Edge Profile', product.specs.edge],
                      ['Country of Origin', product.specs.origin],
                      ['Shade & Texture Variation', product.specs.shadeVariation],
                      ['Suitable Applications', product.application.join(', ')],
                      ['Suitable Spaces', product.rooms.map((r) => r.toUpperCase()).join(', ')],
                    ].map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-[#faf9f6]' : 'bg-white'}>
                        <td className="px-4 py-2.5 font-semibold text-stone-700 w-1/3 border-b border-stone-100">{key}</td>
                        <td className="px-4 py-2.5 text-stone-900 border-b border-stone-100">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Description & Features */}
            <div className="mt-8">
              <h3 className="font-editorial text-2xl font-bold text-stone-900 mb-2">
                Product Details
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {product.description}
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-stone-700">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check size={13} className="text-[#1e5b55]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        <section className="mt-16 pt-12 border-t border-stone-200">
          <h2 className="font-editorial text-3xl text-stone-900 mb-6">
            Coordinated Tiles You May Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-all">
                <Link href={`/product/${rel.id}`}>
                  <div className="aspect-square bg-stone-100 overflow-hidden">
                    <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/product/${rel.id}`}>
                    <h4 className="text-xs font-semibold text-stone-900 group-hover:text-[#1e5b55] truncate cursor-pointer">
                      {rel.name}
                    </h4>
                  </Link>
                  <p className="text-[11px] text-stone-500 mt-1">{rel.size} &bull; ${rel.pricePerSqFt.toFixed(2)}/sq. ft.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
