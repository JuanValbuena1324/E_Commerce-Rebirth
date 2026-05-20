'use client';
import { useUIStore } from '@/store/ui.store';
import type { ViewMode, Filters } from '@/types';

interface Props {
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
}

const Grid3 = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <rect x="0"  y="0"   width="3.5" height="3.5" rx="0.5"/>
    <rect x="5"  y="0"   width="3.5" height="3.5" rx="0.5"/>
    <rect x="10" y="0"   width="3.5" height="3.5" rx="0.5"/>
    <rect x="0"  y="5.5" width="3.5" height="3.5" rx="0.5"/>
    <rect x="5"  y="5.5" width="3.5" height="3.5" rx="0.5"/>
    <rect x="10" y="5.5" width="3.5" height="3.5" rx="0.5"/>
  </svg>
);
const Grid4 = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <rect x="0"    y="0" width="2.5" height="2.5" rx="0.5"/>
    <rect x="3.8"  y="0" width="2.5" height="2.5" rx="0.5"/>
    <rect x="7.5"  y="0" width="2.5" height="2.5" rx="0.5"/>
    <rect x="11.2" y="0" width="2.5" height="2.5" rx="0.5"/>
    <rect x="0"    y="4" width="2.5" height="2.5" rx="0.5"/>
    <rect x="3.8"  y="4" width="2.5" height="2.5" rx="0.5"/>
    <rect x="7.5"  y="4" width="2.5" height="2.5" rx="0.5"/>
    <rect x="11.2" y="4" width="2.5" height="2.5" rx="0.5"/>
  </svg>
);
const Grid6 = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    {([0,2.5,5,7.5,10,12.5] as number[]).flatMap((x,i) => [
      <rect key={`t${i}`} x={x} y="0" width="1.5" height="1.5" rx="0.3"/>,
      <rect key={`b${i}`} x={x} y="3" width="1.5" height="1.5" rx="0.3"/>
    ])}
  </svg>
);

const ICONS: Record<ViewMode, React.ReactNode> = { 3: <Grid3/>, 4: <Grid4/>, 6: <Grid6/> };

export function FilterBar({ filters, onFiltersChange }: Props) {
  const { viewMode, setViewMode, filterOpen, toggleFilter } = useUIStore();

  const btnCls = (v: ViewMode) =>
    `w-7 h-7 border flex items-center justify-center transition-all duration-150 ${
      viewMode === v
        ? 'bg-brand-black border-brand-black text-white'
        : 'border-brand-light bg-transparent text-brand-mid hover:bg-brand-black hover:border-brand-black hover:text-white'
    }`;

  const toggle = (field: keyof Filters, val: string) => {
    const cur = filters[field] as string[];
    onFiltersChange({
      ...filters,
      [field]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val],
    });
  };

  return (
    <>
      <div className="px-4 md:px-8 py-3 md:py-4 border-b border-brand-light flex items-center justify-between bg-brand-offwhite sticky top-[52px] z-40">
        <div className="flex items-center gap-2">
          <span className="hidden sm:block font-cinzel text-[9px] tracking-[0.2em] uppercase text-brand-mid mr-2">View</span>
          {([3, 4, 6] as ViewMode[]).map((v) => (
            <button key={v} className={btnCls(v)} onClick={() => setViewMode(v)} aria-label={`${v} columns`}>
              {ICONS[v]}
            </button>
          ))}
        </div>
        <button
          onClick={toggleFilter}
          className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-brand-black border border-brand-black px-3 md:px-4 py-1.5 bg-transparent hover:bg-brand-black hover:text-white transition-all duration-150"
        >
          Filter +
        </button>
      </div>

      {filterOpen && (
        <div className="bg-brand-offwhite border-b border-brand-light px-4 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <p className="font-cinzel text-[9px] tracking-[0.15em] uppercase text-brand-black mb-3">Categoría</p>
            {['Camisetas', 'Hoodies'].map((c) => (
              <label key={c} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input type="checkbox" checked={filters.categories.includes(c)} onChange={() => toggle('categories', c)} className="accent-brand-black" />
                <span className="text-[12px] text-brand-carbon">{c}</span>
              </label>
            ))}
          </div>
          <div>
            <p className="font-cinzel text-[9px] tracking-[0.15em] uppercase text-brand-black mb-3">Talla</p>
            {['S', 'M', 'L', 'XL'].map((s) => (
              <label key={s} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input type="checkbox" checked={filters.sizes.includes(s)} onChange={() => toggle('sizes', s)} className="accent-brand-black" />
                <span className="text-[12px] text-brand-carbon">{s}</span>
              </label>
            ))}
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="font-cinzel text-[9px] tracking-[0.15em] uppercase text-brand-black mb-3">Precio</p>
            {['Hasta $80.000', '$80.000 – $120.000', '+$120.000'].map((r) => (
              <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input type="checkbox" checked={filters.priceRanges.includes(r)} onChange={() => toggle('priceRanges', r)} className="accent-brand-black" />
                <span className="text-[12px] text-brand-carbon">{r}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
