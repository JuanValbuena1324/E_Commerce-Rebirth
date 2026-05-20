'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/products';

export default function HomePage() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFade, setSplashFade] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('rbth_entered')) setSplashVisible(false);
  }, []);

  const enterSite = () => {
    setSplashFade(true);
    sessionStorage.setItem('rbth_entered', '1');
    setTimeout(() => setSplashVisible(false), 650);
  };

  const mostWanted = PRODUCTS.slice(0, 3);

  return (
    <>
      {/* Splash */}
{splashVisible && (
  <div
    onClick={enterSite}
    className={`fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700 ${splashFade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
  >
    {/* Imagen responsiva */}
    <img 
      src="/images/Rebirth_LP1.png"
      alt="Rebirth"
      className="w-96 sm:w-112 md:w-[600px] lg:w-[700px] h-auto mb-8 sm:mb-12 md:mb-16"
    />
    
    {/* Botón */}
    <button className="font-cinzel text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-brand-black border border-brand-black px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 bg-transparent hover:bg-brand-black hover:text-white transition-all duration-200 -mt-12 sm:-mt-16">
      WELCOME
    </button>
  </div>
)}

      <div className="flex flex-col min-h-screen">
        <Navbar />

{/* Hero */}
<Link href="/shop" className="block">
  <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden cursor-pointer">
    {/* Solo la imagen */}
    <Image 
      src="/images/Rebirth-Home1.png"
      alt="Hero Rebirth"
      fill
      className="object-cover"
      priority
    />
    
    {/* Solo el texto, sin fondos ni sombras */}
    <div className="relative z-10 flex items-center justify-between w-full h-full px-6 md:px-16">
      <div>
        <div className="font-fraktur text-[48px] md:text-[72px] text-white leading-none mb-1">r b t h</div>
        <p className="font-cinzel text-[14px] md:text-[15px] tracking-[0.3em] uppercase text-white">Designer / Clothing</p>
        <p className="font-cinzel text-[14px] md:text-[15px] tracking-[0.2em] uppercase text-white mt-1">Brand / 001</p>
      </div>
      <div className="text-right">
        <div className="font-fraktur text-[36px] md:text-[52px] text-white leading-none">new launch</div>
        <p className="font-cinzel text-[14px] md:text-[15px] tracking-[0.25em] uppercase text-white mt-1">out now</p>
      </div>
    </div>
  </div>
</Link>
        {/* Most Wanted */}
        <section className="px-4 md:px-8 py-8 md:py-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-cinzel text-[11px] font-bold tracking-[0.25em] uppercase text-brand-black whitespace-nowrap">
              Most Wanted
            </h2>
            <div className="flex-1 h-px bg-brand-light" />
          </div>
          {/* 1 col mobile, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-brand-light">
            {mostWanted.map((p) => (
              <ProductCard key={p.id} product={p} viewMode={3} />
            ))}
          </div>
        </section>

        {/* Lookbook */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-brand-light">
          <div className="relative h-[260px] md:h-[520px] overflow-hidden">
              <Image
                src="/images/9thPost_2.png"
                alt="Lookbook 1" fill className="object-cover"
              />
          </div>
          <div className="relative h-[260px] md:h-[520px] overflow-hidden">
              <Image
                src="/images/9thPost_5.png"
                alt="Lookbook 1" fill className="object-cover"
              />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
