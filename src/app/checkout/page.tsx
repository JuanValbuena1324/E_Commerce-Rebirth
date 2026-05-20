'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/store/cart.store';
import { useUIStore } from '@/store/ui.store';
import { SHIPPING_OPTIONS, VALID_DISCOUNT_CODES } from '@/types';
import type { ProductSize } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, removeItem, subtotal, clearCart } = useCartStore();
  const { showToast } = useUIStore();

  const [shipping, setShipping]         = useState('standard');
  const [discountCode, setDiscountCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [payment, setPayment]           = useState('credit');
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false); // mobile accordion

  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    idType: '', idNumber: '', country: 'Colombia',
    department: '', city: '', address: '', postalCode: '',
    cardNumber: '', expDate: '', cvv: '', holderName: '',
  });

  const shippingCost = SHIPPING_OPTIONS.find((o) => o.id === shipping)?.price ?? 9500;
  const sub          = subtotal();
  const discount     = sub * discountRate;
  const total        = sub + shippingCost - discount;

  const applyDiscount = () => {
    const rate = VALID_DISCOUNT_CODES[discountCode.toUpperCase()];
    if (rate) { setDiscountRate(rate); showToast('10% discount applied!'); }
    else showToast('Invalid discount code');
  };

  const placeOrder = () => {
    if (!items.length)                                    { showToast('Your cart is empty'); return; }
    if (!form.email || !form.firstName || !form.lastName) { showToast('Please fill in required fields'); return; }
    const orderNum = 'RBTH-' + Math.random().toString(36).slice(2, 10).toUpperCase();
    showToast(`Order placed! #${orderNum} — Total: $${total.toLocaleString()}`);
    clearCart();
    setTimeout(() => router.push('/'), 2000);
  };

  const Field = ({ field, type = 'text' }: { field: keyof typeof form; type?: string }) => (
    <input
      type={type}
      value={form[field]}
      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
      placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
      className="w-full px-3 py-3 border border-brand-light bg-transparent font-sofia text-[13px] text-brand-black focus:outline-none focus:border-brand-black transition-colors"
    />
  );

  // Order summary panel (shared between mobile accordion and desktop sidebar)
  const OrderSummary = () => (
    <div>
      {/* Items */}
      <div className="max-h-[360px] overflow-y-auto mb-6 space-y-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-3 pb-4 border-b border-brand-light">
            <div className="relative w-[64px] h-[80px] flex-shrink-0 bg-brand-offwhite overflow-hidden">
              <Image src={item.img} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-cinzel text-[10px] font-semibold tracking-[0.08em] uppercase text-brand-black mb-1 truncate">{item.name}</p>
              <p className="font-cinzel text-[9px] tracking-[0.1em] text-brand-mid">Size: {item.size}</p>
              <p className="font-cinzel text-[9px] tracking-[0.1em] text-brand-mid">Qty: {item.quantity}</p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <p className="font-cinzel text-[11px] font-semibold text-brand-black">${(item.price * item.quantity).toLocaleString()}</p>
              <button onClick={() => { removeItem(item.id, item.size as ProductSize); showToast('Item removed'); }}
                className="text-brand-mid hover:text-brand-black text-[13px] transition-colors">✕</button>
            </div>
          </div>
        ))}
      </div>

      {/* Discount */}
      <div className="flex gap-2 mb-5">
        <input value={discountCode} onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Discount code"
          className="flex-1 px-3 py-2 border border-brand-light bg-transparent font-cinzel text-[11px] tracking-[0.1em] focus:outline-none focus:border-brand-black" />
        <button onClick={applyDiscount}
          className="px-3 py-2 border border-brand-black font-cinzel text-[9px] tracking-[0.1em] uppercase hover:bg-brand-black hover:text-white transition-all whitespace-nowrap">
          Apply
        </button>
      </div>

      {/* Totals */}
      <div className="space-y-2 mb-3">
        <div className="flex justify-between">
          <span className="font-cinzel text-[10px] tracking-[0.05em] uppercase text-brand-mid">Subtotal:</span>
          <span className="font-cinzel text-[11px] text-brand-black">${sub.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-cinzel text-[10px] tracking-[0.05em] uppercase text-brand-mid">Shipping:</span>
          <span className="font-cinzel text-[11px] text-brand-black">${shippingCost.toLocaleString()}</span>
        </div>
        {discountRate > 0 && (
          <div className="flex justify-between">
            <span className="font-cinzel text-[10px] tracking-[0.05em] uppercase text-brand-mid">Discount ({discountRate * 100}%):</span>
            <span className="font-cinzel text-[11px] text-brand-black">-${discount.toLocaleString()}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between pt-3 border-t border-brand-light">
        <span className="font-cinzel text-[13px] font-bold text-brand-black uppercase">Total:</span>
        <span className="font-cinzel text-[13px] font-bold text-brand-black">${total.toLocaleString()}</span>
      </div>
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <p className="font-cinzel text-[12px] tracking-widest text-brand-mid text-center">Your cart is empty</p>
          <Link href="/shop" className="px-8 py-3 bg-brand-black text-white font-cinzel text-[10px] tracking-[0.2em] uppercase">
            Shop Now
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex flex-col md:grid" style={{ gridTemplateColumns: '1fr 420px' }}>
        {/* Left — form */}
        <div className="px-4 md:px-10 py-8 border-b md:border-b-0 md:border-r border-brand-light overflow-y-auto order-2 md:order-1">

          {/* Mobile: collapsible order summary */}
          <div className="md:hidden mb-6 border border-brand-light">
            <button onClick={() => setOrderSummaryOpen((o) => !o)}
              className="w-full flex justify-between items-center px-4 py-3 font-cinzel text-[10px] tracking-[0.15em] uppercase text-brand-black">
              <span>Order Summary ({items.length} item{items.length !== 1 ? 's' : ''})</span>
              <span className="text-[16px]">{orderSummaryOpen ? '−' : '+'}</span>
            </button>
            {orderSummaryOpen && (
              <div className="px-4 pb-4 border-t border-brand-light">
                <OrderSummary />
              </div>
            )}
          </div>

          <h2 className="font-cinzel text-[13px] font-bold tracking-[0.2em] uppercase text-brand-black mb-5">Contact</h2>
          <div className="mb-3"><Field field="email" type="email" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <Field field="firstName" /><Field field="lastName" /><Field field="phone" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Field field="idType" /><Field field="idNumber" />
          </div>

          <h2 className="font-cinzel text-[13px] font-bold tracking-[0.2em] uppercase text-brand-black mt-7 mb-5">Shipping</h2>
          <div className="mb-3"><Field field="country" /></div>
          <div className="mb-3"><Field field="address" /></div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Field field="city" /><Field field="department" />
          </div>
          <div className="mb-4"><Field field="postalCode" /></div>

          <div className="space-y-2 mb-6">
            {SHIPPING_OPTIONS.map((opt) => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="shipping" value={opt.id} checked={shipping === opt.id} onChange={() => setShipping(opt.id)} className="accent-brand-black" />
                <span className="font-cinzel text-[10px] tracking-[0.1em] uppercase text-brand-carbon">
                  {opt.label} — ${opt.price.toLocaleString()}
                </span>
              </label>
            ))}
          </div>

          <h2 className="font-cinzel text-[13px] font-bold tracking-[0.2em] uppercase text-brand-black mb-5">Payment</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {['credit', 'transfer', 'cash'].map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" value={m} checked={payment === m} onChange={() => setPayment(m)} className="accent-brand-black" />
                <span className="font-cinzel text-[10px] tracking-[0.1em] uppercase text-brand-carbon capitalize">{m}</span>
              </label>
            ))}
          </div>
          {payment === 'credit' && (
            <div className="space-y-3">
              <Field field="cardNumber" />
              <div className="grid grid-cols-2 gap-3"><Field field="expDate" /><Field field="cvv" /></div>
              <Field field="holderName" />
            </div>
          )}

          {/* Mobile place order button */}
          <button onClick={placeOrder}
            className="md:hidden w-full mt-8 py-4 bg-brand-black text-white font-cinzel text-[10px] tracking-[0.2em] uppercase hover:bg-brand-carbon transition-colors">
            Place Order — ${total.toLocaleString()}
          </button>
        </div>

        {/* Right — desktop order summary */}
        <div className="hidden md:block px-10 py-8 bg-white border-l border-brand-light order-1 md:order-2">
          <h2 className="font-cinzel text-[13px] font-bold tracking-[0.2em] uppercase text-brand-black mb-6">Order Summary</h2>
          <OrderSummary />
          <button onClick={placeOrder}
            className="w-full mt-6 py-4 bg-brand-black text-white font-cinzel text-[10px] tracking-[0.2em] uppercase hover:bg-brand-carbon transition-colors">
            Place Order
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
