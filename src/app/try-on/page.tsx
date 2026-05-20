'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/store/cart.store';
import { useUIStore } from '@/store/ui.store';
import { PRODUCTS } from '@/lib/products';

type Step = 1 | 2 | 3;

export default function TryOnPage() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const productId    = Number(searchParams.get('productId') ?? 0);
  const product      = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];

  const [step, setStep] = useState<Step>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const fileRef         = useRef<HTMLInputElement>(null);

  const addItem   = useCartStore((s) => s.addItem);
  const showToast = useUIStore((s) => s.showToast);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar archivo
    if (!file.type.startsWith('image/')) {
      showToast('Por favor selecciona una imagen válida');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('La imagen debe ser menor a 5MB');
      return;
    }

    setSelectedFile(file);
    setStep(2); // Ir a pantalla de "Processing..."

    try {
      // Crear FormData para enviar a la API
      const formData = new FormData();
      formData.append('humanImage', file);
      
      // Obtener la imagen del producto
      const productImageResponse = await fetch(product.img);
      const productImageBlob = await productImageResponse.blob();
      const productImageFile = new File([productImageBlob], 'garment.jpg', { type: 'image/jpeg' });
      formData.append('garmentImage', productImageFile);
      formData.append('category', 'upper_body');

      // Llamar a la API de Replicate
      const response = await fetch('/api/virtual-tryon', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al generar');
      }

      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
        setStep(3);
        showToast('AI processing complete!');
      } else {
        throw new Error('No se recibió la imagen generada');
      }

    } catch (error) {
      console.error('Error:', error);
      showToast('Error al generar la imagen. Por favor intenta de nuevo.');
      setStep(1); // Volver al paso 1 si hay error
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const resetTryOn = () => {
    setStep(1);
    setSelectedFile(null);
    setGeneratedImageUrl(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const addToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, img: product.img, size: 'M' });
    showToast(`${product.name} added to cart!`);
    router.push('/checkout');
  };

  const StepDot = ({ n }: { n: number }) => (
    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-cinzel text-[10px] transition-all duration-300 ${step >= n ? 'bg-brand-black border-brand-black text-white' : 'border-brand-light text-brand-mid'}`}>
      {n}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex flex-col items-center px-4 md:px-8 py-10 md:py-12">
        <h1 className="font-cinzel text-[13px] md:text-[14px] font-bold tracking-[0.3em] uppercase text-brand-black mb-1 text-center">
          Virtual Try-On
        </h1>
        <p className="font-sofia text-[11px] tracking-[0.15em] uppercase text-brand-mid mb-8 text-center">
          Upload a photo of yourself to see how it fits you
        </p>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          <StepDot n={1} />
          <div className="w-12 md:w-16 h-px bg-brand-light" />
          <StepDot n={2} />
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col items-center w-full max-w-[360px]">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full border border-brand-light bg-white flex flex-col items-center justify-center p-6 md:p-8 cursor-pointer hover:border-brand-black transition-colors duration-200"
            >
              <div className="relative w-[160px] md:w-[200px] h-[200px] md:h-[240px] mb-5">
                <Image src={product.img} alt={product.name} fill className="object-cover" />
              </div>
              <button className="px-6 md:px-8 py-2.5 bg-brand-black text-white font-cinzel text-[9px] tracking-[0.2em] uppercase">
                + Upload Photo
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <p className="font-cinzel text-[9px] tracking-[0.1em] uppercase text-brand-mid text-center mt-4 leading-relaxed">
              Using this AI service you accept our policy and terms.<br />The AI can make errors.
            </p>
          </div>
        )}

        {/* Step 2 — Processing */}
        {step === 2 && (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="spinner" />
            <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-brand-mid">Processing your image...</p>
          </div>
        )}

        {/* Step 3 — Result (con IA real) */}
        {step === 3 && (
          <div className="flex flex-col items-center w-full max-w-[360px]">
            <h2 className="font-cinzel text-[13px] font-bold tracking-[0.3em] uppercase text-brand-black mb-1 text-center">
              Virtual Try-On
            </h2>
            <p className="font-sofia text-[11px] tracking-[0.15em] uppercase text-brand-mid mb-5 text-center">
              AI Image Generated Correctly With Model
            </p>
            <div className="w-full border border-brand-light bg-white p-5 md:p-6">
              <div className="relative w-full h-[260px] md:h-[300px] bg-brand-offwhite mb-3">
                {generatedImageUrl ? (
                  <img 
                    src={generatedImageUrl} 
                    alt="Try-on result" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image src={product.img} alt={product.name} fill className="object-cover" />
                )}
              </div>
              <p className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-brand-mid mb-4">AI Generated Preview</p>
              <div className="flex gap-3">
                <button onClick={addToCart}
                  className="flex-1 py-3 bg-brand-black text-white font-cinzel text-[9px] tracking-[0.15em] uppercase border border-brand-black hover:bg-brand-carbon transition-colors">
                  Add To Cart
                </button>
                <button onClick={resetTryOn}
                  className="flex-1 py-3 bg-transparent text-brand-black font-cinzel text-[9px] tracking-[0.15em] uppercase border border-brand-black hover:bg-brand-black hover:text-white transition-all">
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}