'use client';
import type { Product, ViewMode } from '@/types';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
  viewMode: ViewMode;
}

export function ProductGrid({ products, viewMode }: Props) {
  // On mobile: always 2 columns. On desktop: respect view mode (3/4/6)
  const desktopCols =
    viewMode === 3 ? 'md:grid-cols-3' :
    viewMode === 4 ? 'md:grid-cols-4' :
                     'md:grid-cols-6';

  return (
    <div className={`grid grid-cols-2 ${desktopCols} gap-px bg-brand-light`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} viewMode={viewMode} />
      ))}
    </div>
  );
}
