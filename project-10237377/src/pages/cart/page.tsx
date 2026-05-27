import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'shipping' | 'done'>('cart');
  const [submitted, setSubmitted] = useState(false);

  const subtotal = totalPrice;
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((v, k) => body.append(k, v.toString()));
    body.append('items', JSON.stringify(items.map((i) => ({ name: i.name, size: i.size, qty: i.qty, price: i.price }))));
    body.append('subtotal', String(subtotal));
    body.append('shipping', String(shipping));
    body.append('total', String(total));
    fetch('https://readdy.ai/api/form/d8b4ch6mplddqrtjnu0g', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).then(() => {
      setSubmitted(true);
      setStep('done');
      clearCart();
    }).catch(() => {
      setSubmitted(true);
      setStep('done');
    });
  };

  return (
    <main className="w-full overflow-x-hidden" style={{ background: '#0D0806', minHeight: '100vh' }}>
      <Navbar alwaysTransparent />

      <div className="pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-[#C9A84C]/50 text-sm tracking-[0.4em] uppercase mb-2">Your Order</p>
            <h1 className="serif text-white leading-none italic font-semibold" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>
              SHOPPING <span style={{ color: '#9B2226' }}>BAG</span>
            </h1>
          </div>

          {items.length === 0 && step === 'cart' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(201,168,76,0.1)' }}>
                <i className="ri-shopping-bag-line text-3xl" style={{ color: '#C9A84C' }} />
              </div>
              <p className="serif text-white/50 text-2xl italic mb-3">Your bag is empty</p>
              <p className="text-white/30 text-sm mb-8">Discover our artisan fragrances and find your signature scent</p>
              <Link
                to="/shop"
                className="inline-block px-10 py-4 rounded-full serif text-sm tracking-wider text-white transition-all hover:scale-105 whitespace-nowrap cursor-pointer italic"
                style={{ background: '#9B2226' }}
              >
                EXPLORE FRAGRANCES
              </Link>
            </div>
          )}

          {items.length > 0 && step === 'cart' && (
            <>
              <div className="space-y-4 mb-10">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center gap-5 rounded-2xl p-5"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div
                      className="w-24 h-28 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.08)' }}
                    >
                      <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="serif text-white text-lg italic truncate">{item.name}</p>
                          <p className="text-white/40 text-sm mt-0.5">{item.size}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <i className="ri-delete-bin-line text-white/40 text-base" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div
                          className="flex items-center rounded-full overflow-hidden"
                          style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                        >
                          <button
                            onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                            className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                          >
                            <i className="ri-subtract-line text-sm" />
                          </button>
                          <span className="serif text-white text-base px-3 italic">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                            className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                          >
                            <i className="ri-add-line text-sm" />
                          </button>
                        </div>
                        <p className="serif text-white text-lg italic">€{item.price * item.qty}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-2xl p-6 mb-8"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <h3 className="serif text-white text-xl italic mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-base">
                    <span className="text-white/50">Subtotal</span>
                    <span className="serif text-white italic">€{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-white/50">Shipping</span>
                    <span className="serif text-white italic">
                      {shipping === 0 ? <span style={{ color: '#C9A84C' }}>FREE</span> : `€${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-white/30 text-sm">
                      Free shipping on orders over €150 — add €{150 - subtotal} more
                    </p>
                  )}
                  <div className="pt-3 border-t border-white/10 flex justify-between">
                    <span className="serif text-white text-xl italic">Total</span>
                    <span className="serif text-white text-3xl italic">€{total}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="flex-1 py-4 rounded-full serif text-base tracking-wider text-center transition-all hover:scale-[1.02] whitespace-nowrap cursor-pointer italic"
                  style={{ border: '2px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
                >
                  CONTINUE SHOPPING
                </Link>
                <button
                  onClick={() => setStep('shipping')}
                  className="flex-1 py-4 rounded-full serif text-base tracking-wider text-white transition-all hover:scale-[1.02] whitespace-nowrap cursor-pointer italic"
                  style={{ background: '#9B2226' }}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </>
          )}

          {step === 'shipping' && items.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-8">
                <button
                  onClick={() => setStep('cart')}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-white text-xl" />
                </button>
                <span className="text-white/40 text-base">Back to cart</span>
              </div>

              <form
                data-readdy-form
                id="cart-shipping-form"
                onSubmit={handleSubmitShipping}
                className="space-y-6"
              >
                <div
                  className="rounded-2xl p-6"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <h3 className="serif text-white text-xl italic mb-5">Shipping Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/50 text-sm tracking-wider uppercase mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/20 text-base outline-none focus:border-[#C9A84C] transition-colors"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm tracking-wider uppercase mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/20 text-base outline-none focus:border-[#C9A84C] transition-colors"
                        placeholder="Last name"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-white/50 text-sm tracking-wider uppercase mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/20 text-base outline-none focus:border-[#C9A84C] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-white/50 text-sm tracking-wider uppercase mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/20 text-base outline-none focus:border-[#C9A84C] transition-colors"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-white/50 text-sm tracking-wider uppercase mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/20 text-base outline-none focus:border-[#C9A84C] transition-colors"
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm tracking-wider uppercase mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/20 text-base outline-none focus:border-[#C9A84C] transition-colors"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-sm tracking-wider uppercase mb-2">Postal Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/20 text-base outline-none focus:border-[#C9A84C] transition-colors"
                        placeholder="Postal code"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-white/50 text-sm tracking-wider uppercase mb-2">Country *</label>
                      <select
                        name="country"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-base outline-none focus:border-[#C9A84C] transition-colors appearance-none cursor-pointer"
                        style={{ color: '#fff' }}
                      >
                        <option value="" style={{ color: '#fff', background: '#1a1a1a' }}>Select country</option>
                        <option value="US" style={{ color: '#fff', background: '#1a1a1a' }}>United States</option>
                        <option value="UK" style={{ color: '#fff', background: '#1a1a1a' }}>United Kingdom</option>
                        <option value="CA" style={{ color: '#fff', background: '#1a1a1a' }}>Canada</option>
                        <option value="AU" style={{ color: '#fff', background: '#1a1a1a' }}>Australia</option>
                        <option value="DE" style={{ color: '#fff', background: '#1a1a1a' }}>Germany</option>
                        <option value="FR" style={{ color: '#fff', background: '#1a1a1a' }}>France</option>
                        <option value="LT" style={{ color: '#fff', background: '#1a1a1a' }}>Lithuania</option>
                        <option value="Other" style={{ color: '#fff', background: '#1a1a1a' }}>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <h3 className="serif text-white text-xl italic mb-4">Order Review</h3>
                  <div className="space-y-2 mb-4">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex justify-between text-base">
                        <span className="text-white/60">{item.name} ({item.size}) × {item.qty}</span>
                        <span className="serif text-white italic">€{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="flex justify-between text-base">
                      <span className="text-white/50">Subtotal</span>
                      <span className="serif text-white italic">€{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-white/50">Shipping</span>
                      <span className="serif text-white italic">
                        {shipping === 0 ? <span style={{ color: '#C9A84C' }}>FREE</span> : `€${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/10">
                      <span className="serif text-white italic">Total</span>
                      <span className="serif text-white text-2xl italic">€{total}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 rounded-full serif text-base tracking-wider text-white transition-all hover:scale-[1.02] whitespace-nowrap cursor-pointer italic"
                  style={{ background: '#9B2226' }}
                >
                  PLACE ORDER — €{total}
                </button>
              </form>
            </>
          )}

          {step === 'done' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ background: 'rgba(201,168,76,0.15)' }}
              >
                <i className="ri-check-line text-4xl" style={{ color: '#C9A84C' }} />
              </div>
              <h2 className="serif text-white text-3xl italic mb-3">Order Confirmed!</h2>
              <p className="text-white/50 text-lg mb-2 max-w-md">
                Thank you for your purchase. We'll send a confirmation email shortly with your tracking details.
              </p>
              <p className="text-white/30 text-base mb-8">
                Estimated delivery: 3-5 business days
              </p>
              <Link
                to="/shop"
                className="inline-block px-10 py-4 rounded-full serif text-base tracking-wider text-white transition-all hover:scale-105 whitespace-nowrap cursor-pointer italic"
                style={{ background: '#9B2226' }}
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}