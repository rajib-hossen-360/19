'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  UserRound,
  MapPin,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Phone,
  Lock,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { favorites, samples, setIsSampleDrawerOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOfferBannerVisible, setIsOfferBannerVisible] = useState(true);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'register' | 'pro'>('signin');
  const [userAccount, setUserAccount] = useState<{ email: string; name: string } | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authProBusiness, setAuthProBusiness] = useState('');

  const searchSuggestions = [
    { label: 'Kitchen Tile', href: '/room/kitchen' },
    { label: 'Bathroom Tile', href: '/room/bathroom' },
    { label: 'Backsplash Tile', href: '/room/backsplash' },
    { label: 'Walk-In Shower Tile', href: '/room/shower' },
    { label: 'Outdoor Pavers', href: '/room/outdoor' },
    { label: 'Checkerboard Pairings', href: '/featured/checkerboard' },
    { label: 'Best Sellers', href: '/featured/best-sellers' },
    { label: 'Clearance Tile', href: '/tile/clearance' },
  ].filter((s) => s.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      {isOfferBannerVisible && (
        <div className="relative bg-[#111111] text-white px-4 py-2.5 text-center text-[11px] font-medium tracking-wide flex items-center justify-center">
          <span>
            Sign up for emails &amp; get 15% OFF your purchase.{' '}
            <button
              onClick={() => setIsOfferModalOpen(true)}
              className="underline underline-offset-4 font-semibold hover:text-stone-300 transition-colors ml-1"
            >
              Claim offer
            </button>
          </span>
          <button
            onClick={() => setIsOfferBannerVisible(false)}
            aria-label="Dismiss banner"
            className="absolute right-4 text-stone-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 2. MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ece9e2]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
          {/* Mobile Hamburger Menu Toggle (Hidden on Desktop) */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-stone-100 text-stone-800 transition-colors border border-stone-200 group"
              aria-label="Toggle navigation menu"
            >
              <Menu size={18} className="text-stone-700 group-hover:text-[#1e5b55] transition-colors" />
              <span className="text-xs font-semibold tracking-wide text-stone-800">
                Menu
              </span>
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none">
            <img
              src="/logo.png"
              alt="The Tile Shop"
              className="h-8 sm:h-10 w-auto max-h-12 object-contain transition-transform group-hover:scale-[1.01]"
            />
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6 relative">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
              <input
                type="text"
                placeholder="Search tile, materials, spaces or collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f6f5f2] hover:bg-[#efede8] focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-stone-400 outline-none transition-all placeholder:text-stone-400 text-stone-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Instant search autocomplete dropdown */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden z-50 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block px-2 mb-1">
                  Matching Categories &amp; Rooms
                </span>
                {searchSuggestions.length > 0 ? (
                  <ul className="space-y-1">
                    {searchSuggestions.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setSearchQuery('')}
                          className="flex items-center justify-between px-3 py-2 text-xs text-stone-800 hover:bg-stone-50 rounded-lg transition-colors"
                        >
                          <span>{item.label}</span>
                          <ArrowRight size={13} className="text-stone-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-3 text-xs text-stone-500 text-center">
                    No results for &ldquo;{searchQuery}&rdquo;. Try &ldquo;Bathroom&rdquo; or &ldquo;Kitchen&rdquo;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Utility Navigation */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#2b2b29]">
            <button
              onClick={() => setIsStoreModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 hover:text-[#1e5b55] transition-colors font-medium"
            >
              <MapPin size={16} />
              <span>Find A Store</span>
            </button>

            <button
              onClick={() => {
                setAuthTab('signin');
                setIsAuthModalOpen(true);
              }}
              className="hidden lg:flex items-center gap-1.5 hover:text-[#1e5b55] transition-colors font-medium cursor-pointer"
              aria-label="Sign In"
            >
              <UserRound size={16} className={userAccount ? 'text-[#1e5b55]' : ''} />
              <span>{userAccount ? userAccount.name : 'Sign In'}</span>
            </button>

            <button
              onClick={() => setIsSampleDrawerOpen(true)}
              aria-label="Sample Cart"
              className="relative flex items-center gap-1 bg-[#1e5b55] hover:bg-[#184843] text-white px-3.5 py-2 rounded-full font-medium transition-all shadow-sm"
            >
              <ShoppingBag size={15} />
              <span className="hidden sm:inline text-[11px]">Samples</span>
              <span className="ml-1 bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {samples.length}
              </span>
            </button>
          </div>
        </div>

        {/* 3. PRIMARY MEGA NAVIGATION */}
        <nav className="hidden lg:block border-t border-[#f0eee9] bg-white">
          <div className="max-w-[1360px] mx-auto px-10 flex items-center justify-between text-xs font-medium text-[#3b3a37]">
            <ul className="flex items-center gap-8 py-3">
              <li
                onMouseEnter={() => setActiveMegaMenu('tile-stone')}
                onMouseLeave={() => setActiveMegaMenu(null)}
                className="relative cursor-pointer"
              >
                <span className={`py-2 transition-colors ${activeMegaMenu === 'tile-stone' ? 'text-[#1e5b55] font-semibold' : 'hover:text-[#1e5b55]'}`}>
                  Tile &amp; Stone
                </span>
              </li>
              <li className="relative cursor-pointer">
                <Link
                  href="/room/wood-vinyl"
                  className="py-2 hover:text-[#1e5b55] transition-colors"
                >
                  Wood &amp; Vinyl
                </Link>
              </li>

              <li className="relative cursor-pointer">
                <Link
                  href="/featured/checkerboard"
                  className="py-2 text-[#9a4b2a] font-semibold hover:text-[#78361b] transition-colors flex items-center gap-1"
                >
                  <Sparkles size={13} />
                  Exclusive Collections
                </Link>
              </li>
              <li className="relative cursor-pointer">
                <Link
                  href="/featured/best-sellers"
                  className="py-2 text-[#1e5b55] font-semibold hover:text-[#184843] transition-colors flex items-center gap-1"
                >
                  <Sparkles size={13} />
                  Featured &amp; Best Sellers
                </Link>
              </li>
            </ul>

            <ul className="flex items-center gap-7 py-3 text-stone-600">
              <li>
                <Link href="/room/kitchen" className="hover:text-[#1e5b55] transition-colors">
                  Kitchen
                </Link>
              </li>
              <li>
                <Link href="/room/bathroom" className="hover:text-[#1e5b55] transition-colors">
                  Bathroom
                </Link>
              </li>
              <li>
                <Link href="/room/shower" className="hover:text-[#1e5b55] transition-colors">
                  Shower
                </Link>
              </li>
              <li>
                <Link href="/featured/best-sellers" className="hover:text-[#1e5b55] transition-colors font-semibold text-stone-800">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/tile/clearance" className="hover:text-[#aa3e35] font-semibold text-[#aa3e35] transition-colors">
                  Clearance
                </Link>
              </li>
            </ul>
          </div>

          {/* Mega Menu Dropdown */}
          {activeMegaMenu === 'tile-stone' && (
            <div
              onMouseEnter={() => setActiveMegaMenu('tile-stone')}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="absolute left-0 w-full bg-white border-b border-t border-[#e8e5dc] shadow-2xl py-8 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
            >
              <div className="max-w-[1360px] mx-auto px-10 grid grid-cols-4 gap-8">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3 font-sans">
                    Shop By Room
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {[
                      { name: 'Kitchen Tile', href: '/room/kitchen' },
                      { name: 'Bathroom Tile', href: '/room/bathroom' },
                      { name: 'Backsplash Tile', href: '/room/backsplash' },
                      { name: 'Shower Tile', href: '/room/shower' },
                      { name: 'Outdoor Tile', href: '/room/outdoor' },
                      { name: 'Laundry Room Tile', href: '/room/laundry' },
                    ].map((room) => (
                      <li key={room.name}>
                        <Link
                          href={room.href}
                          onClick={() => setActiveMegaMenu(null)}
                          className="hover:text-[#1e5b55] hover:translate-x-1 inline-block transition-all"
                        >
                          {room.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3 font-sans">
                    Featured Collections
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {[
                      { name: 'Best Sellers', href: '/featured/best-sellers' },
                      { name: 'New Arrivals', href: '/featured/new-arrivals' },
                      { name: 'Checkerboard Pairings', href: '/featured/checkerboard' },
                      { name: 'Porcelain Panel Kits', href: '/featured/porcelain-slabs' },
                      { name: 'Tile Under $7', href: '/featured/tiles-under-7' },
                      { name: 'Clearance Tile (Up to 50% Off)', href: '/tile/clearance' },
                    ].map((col) => (
                      <li key={col.name}>
                        <Link
                          href={col.href}
                          onClick={() => setActiveMegaMenu(null)}
                          className="hover:text-[#1e5b55] hover:translate-x-1 inline-block transition-all"
                        >
                          {col.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3 font-sans">
                    Popular Materials &amp; Looks
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {['Glazed Porcelain Slabs', 'Artisanal Ceramic Subway', 'Natural Carrara Marble', 'Tumbled Travertine', 'Textured Cleaved Slate', 'Metallic Pearl Accents'].map((look) => (
                      <li key={look}>
                        <Link
                          href="/room/bathroom"
                          onClick={() => setActiveMegaMenu(null)}
                          className="hover:text-[#1e5b55] hover:translate-x-1 inline-block transition-all"
                        >
                          {look}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#f8f7f4] p-5 rounded-xl border border-[#ece8df]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1e5b55]">
                    Inspiration Gallery
                  </span>
                  <h5 className="font-editorial text-xl font-bold mt-1 text-stone-900 leading-snug">
                    Real Customer Spaces
                  </h5>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Explore high-resolution kitchen and bath transformations, view designer palettes, and order direct $3 samples.
                  </p>
                  <Link
                    href="/room/bathroom"
                    onClick={() => setActiveMegaMenu(null)}
                    className="mt-4 bg-[#111111] hover:bg-[#2e2d2a] text-white text-[11px] font-semibold py-2 px-4 rounded-md transition-all inline-flex items-center gap-1.5"
                  >
                    Explore Bathroom Gallery <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* SLIDE-OVER HAMBURGER MENU DRAWER (Mobile) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over panel from left */}
          <div className="relative w-[85vw] max-w-sm sm:max-w-md bg-white h-[100dvh] max-h-[100dvh] shadow-2xl flex flex-col z-10 overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo.png" alt="The Tile Shop" className="h-8 w-auto object-contain" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-6">
              {/* Search with autocomplete suggestions */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
                <input
                  type="text"
                  placeholder="Search spaces, tiles or materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f4f3ef] text-xs pl-9 pr-8 py-2.5 rounded-lg outline-none focus:bg-white focus:ring-1 focus:ring-[#1e5b55]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X size={14} />
                  </button>
                )}
                {/* Instant suggestions */}
                {searchQuery.trim().length > 0 && (
                  <div className="mt-2 bg-white rounded-lg shadow-md border border-stone-200 p-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block px-2 mb-1">
                      Matching Categories
                    </span>
                    {searchSuggestions.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => { setSearchQuery(''); setMobileMenuOpen(false); }}
                        className="flex items-center justify-between px-2.5 py-1.5 text-xs text-stone-800 hover:bg-stone-50 rounded"
                      >
                        <span>{item.label}</span>
                        <ArrowRight size={12} className="text-stone-400" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Sign In / Account Action Card */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthTab('signin');
                  setIsAuthModalOpen(true);
                }}
                className="w-full text-left bg-gradient-to-r from-stone-50 to-[#edf6f4] border border-stone-200 hover:border-[#1e5b55] rounded-xl p-3 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#1e5b55] shadow-xs group-hover:bg-[#1e5b55] group-hover:text-white transition-colors">
                    <UserRound size={17} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block leading-tight">
                      {userAccount ? userAccount.name : 'Sign In / Register'}
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      {userAccount ? userAccount.email : 'Access account & 15% discount'}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-[#1e5b55] group-hover:bg-[#184843] text-white text-[11px] font-semibold rounded-full shadow-xs transition-colors shrink-0">
                  {userAccount ? 'Account' : 'Sign In'}
                </div>
              </button>

              {/* HIGHLIGHTED SPOTLIGHT CARD: Featured Tiles & Best Sellers */}
              <Link
                href="/featured/best-sellers"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-4 rounded-xl bg-gradient-to-br from-[#f8faf9] to-[#edf6f4] border border-[#c4dcda] hover:border-[#1e5b55] hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1e5b55]">
                    Order $3 Direct Samples
                  </span>
                  <span className="bg-[#1e5b55] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    FEATURED
                  </span>
                </div>
                <h4 className="font-editorial text-lg font-bold text-stone-900 group-hover:text-[#1e5b55] transition-colors">
                  Featured Tiles &amp; Best Sellers &rarr;
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                  View customer favorites, trending marble looks, subway artisan tiles, and order $3 cut samples.
                </p>
              </Link>

              {/* 1. Core Departments: Shop By Room */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2 font-sans">
                  Shop by Room &amp; Space
                </span>
                <ul className="space-y-1.5 text-xs font-medium text-stone-800">
                  <li><Link href="/room/kitchen" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Kitchen Tile</Link></li>
                  <li><Link href="/room/bathroom" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Bathroom Tile</Link></li>
                  <li><Link href="/room/shower" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Shower Tile</Link></li>
                  <li><Link href="/room/backsplash" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Backsplash Tile</Link></li>
                  <li><Link href="/room/outdoor" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Outdoor Pavers &amp; Patio</Link></li>
                  <li><Link href="/room/laundry" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Laundry &amp; Mudroom</Link></li>
                </ul>
              </div>

              {/* 2. Flooring & Surfaces */}
              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2 font-sans">
                  Flooring &amp; Surfaces
                </span>
                <ul className="space-y-1.5 text-xs font-medium text-stone-800">
                  <li><Link href="/room/bathroom" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Tile &amp; Natural Stone</Link></li>
                  <li><Link href="/room/wood-vinyl" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Wood &amp; Luxury Vinyl Flooring</Link></li>
                </ul>
              </div>

              {/* 3. Popular Materials & Looks */}
              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2 font-sans">
                  Materials &amp; Popular Looks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: 'Marble Look', href: '/featured/best-sellers' },
                    { name: 'Subway Tile', href: '/featured/best-sellers' },
                    { name: 'Porcelain Slabs', href: '/featured/porcelain-slabs' },
                    { name: 'Tumbled Travertine', href: '/featured/best-sellers' },
                    { name: 'Textured Slate', href: '/featured/best-sellers' },
                    { name: 'Checkerboard Pattern', href: '/featured/checkerboard' },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[11px] bg-stone-100 hover:bg-[#edf6f4] hover:text-[#1e5b55] px-2.5 py-1 rounded-md transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 4. Curated Collections */}
              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2 font-sans">
                  Curated Collections
                </span>
                <ul className="space-y-1.5 text-xs font-medium text-stone-800">
                  <li>
                    <Link href="/featured/best-sellers" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-semibold text-[#1e5b55] hover:underline flex items-center justify-between">
                      <span>Featured &amp; Best Sellers</span>
                      <span className="text-[9px] bg-emerald-100 text-[#1e5b55] px-1.5 py-0.5 rounded font-bold uppercase">Popular</span>
                    </Link>
                  </li>
                  <li><Link href="/featured/checkerboard" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Exclusive Checkerboard Pairings</Link></li>
                  <li><Link href="/featured/new-arrivals" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">New Arrival Tiles</Link></li>
                  <li><Link href="/featured/porcelain-slabs" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Porcelain Panel Shower Kits</Link></li>
                  <li><Link href="/featured/tiles-under-7" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Tile Under $7</Link></li>
                  <li><Link href="/tile/clearance" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#aa3e35] font-semibold hover:underline">Clearance Tile (Up to 50% Off)</Link></li>
                </ul>
              </div>

              {/* 5. Inspiration & Customer Spaces */}
              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2 font-sans">
                  Design &amp; Inspiration
                </span>
                <ul className="space-y-1.5 text-xs font-medium text-stone-800">
                  <li><Link href="/room/bathroom" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Real Customer Spaces Gallery</Link></li>
                  <li><Link href="/room/kitchen" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Kitchen Backsplash Ideas</Link></li>
                  <li><Link href="/room/shower" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#1e5b55]">Shower Transformation Inspiration</Link></li>
                </ul>
              </div>


            </div>

            {/* Fixed Drawer Bottom Bar */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 shrink-0 space-y-2">
              <button
                onClick={() => { setMobileMenuOpen(false); setIsSampleDrawerOpen(true); }}
                className="w-full bg-[#1e5b55] hover:bg-[#184843] text-white py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <ShoppingBag size={15} />
                <span>View $3 Samples Bag ({samples.length})</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthTab('signin');
                  setIsAuthModalOpen(true);
                }}
                className="w-full bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <UserRound size={15} className="text-[#1e5b55]" />
                <span>{userAccount ? `Account (${userAccount.name})` : 'Sign In to Your Account'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15% OFF CLAIM OFFER MODAL */}
      {isOfferModalOpen && (
        <div
          onClick={() => setIsOfferModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative text-center cursor-default"
          >
            <button
              onClick={() => setIsOfferModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800"
            >
              <X size={18} />
            </button>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1e5b55]">
              Exclusive Welcome Offer
            </span>
            <h3 className="font-editorial text-3xl font-bold text-stone-900 mt-2">
              Save 15% On Your Tile Order
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Use promo code <span className="font-bold text-[#1e5b55] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">WELCOME15</span> at checkout or enter your email to save it to your account.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Offer saved to your email! Promo code WELCOME15 applied.');
                setIsOfferModalOpen(false);
              }}
              className="mt-6 space-y-3"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-[#1e5b55]"
              />
              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-stone-800 text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Claim 15% Discount
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STORE LOCATOR MODAL */}
      {isStoreModalOpen && (
        <div
          onClick={() => setIsStoreModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative cursor-default"
          >
            <button
              onClick={() => setIsStoreModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800"
            >
              <X size={18} />
            </button>
            <h3 className="font-editorial text-2xl font-bold text-stone-900">Find A Tile Shop Showroom</h3>
            <p className="text-xs text-stone-500 mt-1">Explore over 140+ showrooms across the United States.</p>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Enter Zip Code or City, State"
                className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-[#1e5b55]"
              />
              <button
                onClick={() => alert('Found 3 nearby showrooms within 25 miles!')}
                className="bg-[#1e5b55] text-white px-4 py-2.5 rounded-lg text-xs font-semibold"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIGN IN / ACCOUNT MODAL */}
      {isAuthModalOpen && (
        <div
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative cursor-default"
          >
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {userAccount ? (
              /* Signed in profile view */
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-[#edf6f4] text-[#1e5b55] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  {userAccount.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-stone-900">
                    Welcome back, {userAccount.name}!
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">{userAccount.email}</p>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Account Status:</span>
                    <span className="font-semibold text-[#1e5b55] flex items-center gap-1">
                      <CheckCircle2 size={13} /> Active Customer
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Saved Wishlist:</span>
                    <span className="font-semibold text-stone-800">{favorites.length} tiles</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">Samples in Bag:</span>
                    <span className="font-semibold text-stone-800">{samples.length} items</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(false);
                      setIsSampleDrawerOpen(true);
                    }}
                    className="w-full bg-[#1e5b55] hover:bg-[#184843] text-white py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm"
                  >
                    View My Sample Bag ({samples.length})
                  </button>
                  <button
                    onClick={() => {
                      setUserAccount(null);
                      setAuthEmail('');
                      setAuthPassword('');
                    }}
                    className="w-full text-xs text-stone-500 hover:text-red-600 py-1.5 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              /* Login / Register tabs */
              <div>
                <div className="text-center mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e5b55] block mb-1">
                    Customer Account
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-stone-900">
                    {authTab === 'signin'
                      ? 'Sign In to Your Account'
                      : authTab === 'register'
                      ? 'Create a Free Account'
                      : 'Trade Pro Portal Login'}
                  </h3>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-stone-200 mb-6 text-xs font-medium">
                  <button
                    onClick={() => setAuthTab('signin')}
                    className={`flex-1 pb-2.5 border-b-2 text-center transition-all ${
                      authTab === 'signin'
                        ? 'border-[#1e5b55] text-[#1e5b55] font-bold'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthTab('register')}
                    className={`flex-1 pb-2.5 border-b-2 text-center transition-all ${
                      authTab === 'register'
                        ? 'border-[#1e5b55] text-[#1e5b55] font-bold'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Register
                  </button>
                  <button
                    onClick={() => setAuthTab('pro')}
                    className={`flex-1 pb-2.5 border-b-2 text-center transition-all ${
                      authTab === 'pro'
                        ? 'border-[#1e5b55] text-[#1e5b55] font-bold'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Trade Pro
                  </button>
                </div>

                {/* Tab: SIGN IN */}
                {authTab === 'signin' && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!authEmail) return;
                      const name = authEmail.split('@')[0];
                      setUserAccount({
                        email: authEmail,
                        name: name.charAt(0).toUpperCase() + name.slice(1),
                      });
                      setIsAuthModalOpen(false);
                      alert('Welcome back! You are now signed in.');
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
                        <input
                          type="email"
                          required
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs outline-none focus:border-[#1e5b55] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => alert('Password reset link sent to your email!')}
                          className="text-[10px] text-[#1e5b55] hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
                        <input
                          type="password"
                          required
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs outline-none focus:border-[#1e5b55] transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-xs text-stone-600">
                      <input type="checkbox" id="rememberMe" className="rounded accent-[#1e5b55]" defaultChecked />
                      <label htmlFor="rememberMe" className="text-[11px]">Remember me on this browser</label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1e5b55] hover:bg-[#184843] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Sign In
                    </button>

                    <p className="text-center text-xs text-stone-500 pt-2">
                      Don&apos;t have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthTab('register')}
                        className="text-[#1e5b55] font-semibold hover:underline"
                      >
                        Create one now
                      </button>
                    </p>
                  </form>
                )}

                {/* Tab: REGISTER */}
                {authTab === 'register' && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!authEmail) return;
                      setUserAccount({
                        email: authEmail,
                        name: authName || authEmail.split('@')[0],
                      });
                      setIsAuthModalOpen(false);
                      alert('Account successfully created! 15% welcome discount code applied.');
                    }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1e5b55] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1e5b55] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Create Password
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        placeholder="At least 6 characters"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1e5b55] transition-all"
                      />
                    </div>

                    <div className="flex items-start gap-2 pt-1 text-xs text-stone-600">
                      <input type="checkbox" id="welcomeOffer" className="rounded mt-0.5 accent-[#1e5b55]" defaultChecked />
                      <label htmlFor="welcomeOffer" className="text-[11px] leading-snug">
                        Sign up for email exclusives &amp; receive 15% off your first tile purchase.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1e5b55] hover:bg-[#184843] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Create Account
                    </button>

                    <p className="text-center text-xs text-stone-500 pt-2">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthTab('signin')}
                        className="text-[#1e5b55] font-semibold hover:underline"
                      >
                        Sign In
                      </button>
                    </p>
                  </form>
                )}

                {/* Tab: PRO PORTAL */}
                {authTab === 'pro' && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!authEmail) return;
                      setUserAccount({
                        email: authEmail,
                        name: authProBusiness ? `${authProBusiness} (Pro)` : 'Pro Member',
                      });
                      setIsAuthModalOpen(false);
                      alert('Welcome Pro Member! Trade commercial 20% discount activated.');
                    }}
                    className="space-y-3.5"
                  >
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 leading-snug">
                      Trade Pro members receive 20% wholesale pricing, free full sample kits, and dedicated account managers.
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Company / Studio Name
                      </label>
                      <input
                        type="text"
                        required
                        value={authProBusiness}
                        onChange={(e) => setAuthProBusiness(e.target.value)}
                        placeholder="Studio Design LLC / Builder Inc."
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1e5b55] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Business Email
                      </label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="pro@studio.com"
                        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1e5b55] transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#111111] hover:bg-stone-800 text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Sign In to Pro Portal
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
