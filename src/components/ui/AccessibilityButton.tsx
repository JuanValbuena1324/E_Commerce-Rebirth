'use client';
import { useState, useEffect } from 'react';

export function AccessibilityButton() {
  const [fontSize, setFontSize] = useState(100);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Cargar tamaño guardado
    const savedSize = localStorage.getItem('rebirth-font-size');
    if (savedSize) {
      setFontSize(parseInt(savedSize));
      document.documentElement.style.fontSize = `${parseInt(savedSize)}%`;
    }
  }, []);

  const increaseFont = () => {
    const newSize = Math.min(fontSize + 10, 150);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('rebirth-font-size', newSize.toString());
  };

  const decreaseFont = () => {
    const newSize = Math.max(fontSize - 10, 70);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('rebirth-font-size', newSize.toString());
  };

  const resetFont = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
    localStorage.setItem('rebirth-font-size', '100');
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-brand-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-brand-carbon transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-2"
        aria-label="Opciones de accesibilidad"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
        </svg>
      </button>

      {/* Panel de opciones */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-xl border border-brand-light p-4 w-64">
          <div className="text-center mb-3">
            <p className="font-cinzel text-[10px] tracking-wider uppercase text-brand-mid">Tamaño de texto</p>
            <p className="font-cinzel text-xs text-brand-black mt-1">{fontSize}%</p>
          </div>
          
          <div className="flex gap-2 mb-3">
            <button
              onClick={decreaseFont}
              className="flex-1 py-2 border border-brand-light rounded font-cinzel text-[11px] uppercase text-brand-black hover:bg-brand-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-black"
              aria-label="Disminuir tamaño de texto"
            >
              A- / Disminuir
            </button>
            <button
              onClick={increaseFont}
              className="flex-1 py-2 border border-brand-light rounded font-cinzel text-[11px] uppercase text-brand-black hover:bg-brand-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-black"
              aria-label="Aumentar tamaño de texto"
            >
              A+ / Aumentar
            </button>
          </div>
          
          <button
            onClick={resetFont}
            className="w-full py-2 bg-brand-black text-white rounded font-cinzel text-[10px] uppercase tracking-wider hover:bg-brand-carbon transition-colors focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-1"
            aria-label="Restablecer tamaño de texto"
          >
            Restablecer
          </button>
        </div>
      )}
    </>
  );
}