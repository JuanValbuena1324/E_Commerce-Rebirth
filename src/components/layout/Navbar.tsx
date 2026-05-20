'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cart.store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems);
  const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCount(totalItems());
  }, [totalItems]);

  const navLinks = [
    { href: '/', label: 'All' },
    { href: '/shop?cat=men', label: 'Men' },
    { href: '/shop?cat=women', label: 'Women' },
    { href: '/shop', label: 'Collections' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-brand-offwhite/40 border-b border-brand-light/30 flex items-center justify-between px-4 md:px-8 h-[52px]">
        {/* Desktop nav links */}
        <div className="hidden md:flex gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-cinzel text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-brand-carbon hover:text-brand-black transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-brand-black transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-brand-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-brand-black transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>

        {/* Logo */}
        <div
          onClick={() => {
            sessionStorage.removeItem('rbth_entered');
            window.location.href = '/';
          }}
          className="nav-logo hover:opacity-80 transition-opacity absolute left-1/2 -translate-x-1/2 cursor-pointer"
        >
          rebirth
        </div>

        {/* Icons - SVG */}
        <div className="flex items-center gap-4">
          <Link href="/shop" className="text-brand-carbon hover:text-brand-black transition-colors">
            <svg className="w-[1.25rem] h-[1.25rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          <Link href="/login" className="text-brand-carbon hover:text-brand-black transition-colors">
            <svg className="w-[1.25rem] h-[1.25rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <Link href="/checkout" className="relative text-brand-carbon hover:text-brand-black transition-colors">
            <svg className="w-[1.25rem] h-[1.25rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-[5px] -right-[6px] bg-brand-black text-white rounded-full w-4 h-4 flex items-center justify-center font-cinzel text-[0.5625rem]">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden sticky top-[52px] z-40 bg-brand-offwhite border-b border-brand-light px-4 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-cinzel text-[0.6875rem] font-semibold tracking-[0.2em] uppercase text-brand-carbon hover:text-brand-black transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}