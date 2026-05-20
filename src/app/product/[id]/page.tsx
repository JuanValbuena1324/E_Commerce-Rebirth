'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { useCartStore } from '@/store/cart.store';
import { useUIStore } from '@/store/ui.store';
import { PRODUCTS } from '@/lib/products';
import type { ProductSize } from '@/types';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const showToast = useUIStore((s) => s.showToast);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-cinzel tracking-widest text-brand-mid">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, img: product.img, size: selectedSize }, qty);
    showToast(`Added ${qty}× ${product.name} (${selectedSize}) to cart`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Product detail - Imagen centro | Info izquierda centrada | Acciones derecha pequeña */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* Columna izquierda - Información centrada verticalmente */}
        <div className="order-1 flex flex-col justify-center">
          <h1 className="font-cinzel text-[15px] md:text-[16px] font-bold tracking-[0.1em] uppercase text-brand-black mb-1">
            {product.name}
          </h1>
          <p className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-brand-mid mb-5">
            {product.subtitle}
          </p>
          <p className="font-sofia text-[13px] md:text-[12px] leading-relaxed text-brand-carbon mb-6">
            {product.desc}
          </p>
          <p className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-brand-black mt-6">
            Made In Colombia
          </p>
        </div>

        {/* Columna central - Imagen del producto */}
        <div className="order-2 flex items-center justify-center">
          <div className="relative w-full max-w-[400px] aspect-square">
            <Image 
              src={product.img} 
              alt={product.name} 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Columna derecha - Acciones más pequeñas con cantidad */}
        <div className="order-3 flex flex-col justify-center">
          <div className="max-w-[280px]">
            <p className="font-cinzel text-[22px] md:text-[20px] font-bold text-brand-black mb-6">
              ${product.price.toLocaleString()}
            </p>

            <p className="font-cinzel text-[9px] tracking-[0.15em] uppercase text-brand-mid mb-2">Size</p>
            <div className="flex gap-1 mb-6 flex-wrap">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s as ProductSize)}
                  className={`w-10 h-10 border font-cinzel text-[10px] tracking-[0.05em] transition-all duration-150 ${
                    selectedSize === s
                      ? 'bg-brand-black text-white border-brand-black'
                      : 'border-brand-light text-brand-carbon hover:bg-brand-black hover:text-white hover:border-brand-black'
                  }`}>
                  {s}
                </button>
              ))}
            </div>

            {/* Quantity selector */}
            <p className="font-cinzel text-[9px] tracking-[0.15em] uppercase text-brand-mid mb-2">Quantity</p>
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 border border-brand-light flex items-center justify-center text-brand-black text-[16px] hover:bg-brand-black hover:text-white transition-colors"
              >
                −
              </button>
              <span className="font-cinzel text-[14px] text-brand-black min-w-[24px] text-center">{qty}</span>
              <button 
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 border border-brand-light flex items-center justify-center text-brand-black text-[16px] hover:bg-brand-black hover:text-white transition-colors"
              >
                +
              </button>
            </div>

            <button onClick={handleAddToCart}
              className="w-full py-3.5 bg-brand-black text-white font-cinzel text-[10px] tracking-[0.2em] uppercase hover:bg-brand-carbon transition-colors mb-2">
              ADD TO SHOPPING CART
            </button>

            <Link href={`/try-on?productId=${product.id}`}
              className="block w-full py-3 text-center font-cinzel text-[9px] tracking-[0.2em] uppercase text-brand-black border border-brand-black hover:bg-brand-black hover:text-white transition-all duration-150">
              | VIRTUAL TRY-ON |
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="px-4 md:px-8 py-8 md:py-12 border-t border-brand-light">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-cinzel text-[11px] font-bold tracking-[0.25em] uppercase text-brand-black whitespace-nowrap">
            Related Garments
          </h2>
          <div className="flex-1 h-px bg-brand-light" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-light">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} viewMode={4} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}