'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, ViewMode } from '@/types';

interface Props {
  product: Product;
  viewMode: ViewMode;
}

export function ProductCard({ product, viewMode }: Props) {
  // On mobile always show name+price (viewMode is overridden visually to 2-col)
  // On desktop respect viewMode rules
  const showName  = viewMode <= 4;
  const showPrice = viewMode <= 3;

  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-brand-offwhite hover:bg-white transition-colors duration-200 overflow-hidden"
    >
      <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Always show info on mobile; respect viewMode on desktop */}
      <div className={`px-3 pt-2 pb-3 ${showName ? 'block' : 'hidden md:hidden'}`}>
        <p className="font-cinzel text-[9px] md:text-[10px] font-semibold tracking-[0.1em] uppercase text-brand-carbon mb-1 truncate">
          {product.name}
        </p>
        <p className={`font-sofia text-[11px] md:text-[12px] text-brand-mid ${showPrice ? 'block' : 'hidden'}`}>
          ${product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
