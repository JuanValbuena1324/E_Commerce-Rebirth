'use client';
import { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterBar } from '@/components/product/FilterBar';
import { useUIStore } from '@/store/ui.store';
import { PRODUCTS } from '@/lib/products';
import type { Filters } from '@/types';

export default function ShopPage() {
  const { viewMode } = useUIStore();
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    sizes: [],
    priceRanges: [],
  });

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.sizes.length && !filters.sizes.some((s) => p.sizes.includes(s as any))) return false;
      if (filters.priceRanges.length) {
        const inRange = filters.priceRanges.some((r) => {
          if (r === 'Hasta $80.000')      return p.price <= 80000;
          if (r === '$80.000 – $120.000') return p.price > 80000 && p.price <= 120000;
          if (r === '+$120.000')          return p.price > 120000;
          return false;
        });
        if (!inRange) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <FilterBar filters={filters} onFiltersChange={setFilters} />
      <main className="flex-1">
        <ProductGrid products={filtered} viewMode={viewMode} />
      </main>
      <Footer />
    </div>
  );
}
