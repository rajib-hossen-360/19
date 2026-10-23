'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2a2924] text-stone-200 mt-auto">
      {/* Email Newsletter Section */}
      <div className="border-b border-[#3e3c36] bg-[#33312b] py-8">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#69c6bc] block">
              Stay Connected
            </span>
            <h4 className="font-editorial text-2xl text-white font-normal mt-0.5">
              Design + Trends + Expert Advice
            </h4>
            <p className="text-xs text-stone-400 mt-1">
              Sign up to receive 15% off your first tile order and exclusive designer previews.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing! Check your email for your 15% discount code.');
            }}
            className="flex w-full md:w-auto gap-2"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="bg-white text-stone-900 px-4 py-2.5 rounded text-xs outline-none w-full md:w-72 placeholder:text-stone-400"
            />
            <button
              type="submit"
              className="bg-[#1e5b55] hover:bg-[#184843] text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Link Columns */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
        <div>
          <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-4">
            Shop Tile
          </h5>
          <ul className="space-y-2.5 text-stone-400">
            <li><Link href="/room/bathroom" className="hover:text-white transition-colors">Bathroom Tile</Link></li>
            <li><Link href="/room/kitchen" className="hover:text-white transition-colors">Kitchen Tile</Link></li>
            <li><Link href="/room/backsplash" className="hover:text-white transition-colors">Backsplash Tile</Link></li>
            <li><Link href="/room/shower" className="hover:text-white transition-colors">Shower Tile</Link></li>
            <li><Link href="/room/outdoor" className="hover:text-white transition-colors">Outdoor Pavers</Link></li>
            <li><Link href="/room/laundry" className="hover:text-white transition-colors">Laundry Room Tile</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-4">
            Collections
          </h5>
          <ul className="space-y-2.5 text-stone-400">
            <li><Link href="/featured/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
            <li><Link href="/featured/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link href="/featured/checkerboard" className="hover:text-white transition-colors">Checkerboard Pairings</Link></li>
            <li><Link href="/featured/porcelain-slabs" className="hover:text-white transition-colors">Porcelain Panel Kits</Link></li>
            <li><Link href="/featured/tiles-under-7" className="hover:text-white transition-colors">Tile Under $7</Link></li>
            <li><Link href="/tile/clearance" className="hover:text-white transition-colors text-amber-300">Clearance Tile</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-4">
            Pro Network
          </h5>
          <ul className="space-y-2.5 text-stone-400">
            <li><a href="#" className="hover:text-white transition-colors">Trade Discounts</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Job-Site Logistics</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pro Rewards Program</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Commercial Specifications</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-4">
            Company
          </h5>
          <ul className="space-y-2.5 text-stone-400">
            <li><a href="#" className="hover:text-white transition-colors">About The Tile Shop</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Investor Relations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-4">
            Customer Support
          </h5>
          <ul className="space-y-2.5 text-stone-400">
            <li className="text-white font-semibold flex items-center gap-1.5">
              <Phone size={13} className="text-[#69c6bc]" />
              888-398-6595
            </li>
            <li>Customer Service Hours:</li>
            <li className="text-stone-300">Mon–Fri: 8am–6pm CST</li>
            <li className="text-stone-300">Sat–Sun: Closed</li>
            <li className="pt-2"><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
          </ul>
        </div>
      </div>

      {/* Strip */}
      <div className="border-t border-[#3e3c36] py-6">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} The Tile Shop. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white">Accessibility</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white">California Proposition 65</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
