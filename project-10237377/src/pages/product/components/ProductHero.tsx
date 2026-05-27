import { useState } from 'react';
import type { Product } from '@/mocks/products';
import { useCart, addProductToCart } from '@/hooks/useCart';

interface Props {
  product: Product;
}

function getFamily(product: Product): string {
  if (product.fragranceFamily) return product.fragranceFamily;
  const noteMap: Record<string, string> = {
    floral: 'Floral', woody: 'Woody', gourmand: 'Gourmand',
    fresh: 'Fresh', leather: 'Leather', smoky: 'Smoky', oriental: 'Oriental',
  };
  return noteMap[product.note || ''] || 'Floral';
}

export default function ProductHero({ product }: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const singleSize = product.sizes[0];
  const price = singleSize?.price ?? product.price;
  const family = getFamily(product);
  const concentration = product.concentration || '30% Extrait de Parfum';
  const longevity = product.longevity || '12+ hours';
  const projection = product.projection || 'Strong';

  const topNotes = product.scentNotes?.top || product.ingredients.slice(0, 3);
  const heartNotes = product.scentNotes?.heart || product.ingredients.slice(3, 6);
  const baseNotes = product.scentNotes?.base || product.ingredients.slice(6);

  const handleAdd = () => {
    addProductToCart(product, singleSize.label, price * qty, addItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="w-full" style={{ background: '#FCFAF7' }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 md:mb-6 text-xs text-[#080808]/25">
          <a href="/shop" className="hover:text-[#080808]/50 transition-colors">Shop</a>
          <span className="text-[#080808]/12">/</span>
          <a href={`/${product.category.toLowerCase()}`} className="hover:text-[#080808]/50 transition-colors">{product.category}</a>
          <span className="text-[#080808]/12">/</span>
          <span className="text-[#080808]/35">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left — Product Image */}
          <div className="flex-1 w-full">
            <div
              className="w-full rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                aspectRatio: '3/4',
                background: 'linear-gradient(160deg, #F8F5F0, #F0EBE3)',
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <img src={product.img} alt={product.name} className="w-full h-full object-contain p-2" />
            </div>

            {/* Trust badges under image */}
            <div className="flex items-center justify-center gap-6 mt-4 text-[10px] text-[#080808]/25 tracking-wider">
              <div className="flex items-center gap-1"><i className="ri-shield-check-line" /> Secure Checkout</div>
              <div className="flex items-center gap-1"><i className="ri-truck-line" /> EU Delivery 3-7 Days</div>
              <div className="flex items-center gap-1"><i className="ri-gift-line" /> Premium Packaging</div>
            </div>
          </div>

          {/* Right — Product Details */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Tag + Family */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] px-3 py-1 rounded-full italic whitespace-nowrap font-medium tracking-wider" style={{ background: 'rgba(8,8,8,0.85)', color: '#C4A44A' }}>
                {family}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#080808]/25">{product.category} · {product.weight}</span>
            </div>

            {/* Name */}
            <h1 className="serif leading-none italic mb-3 text-[#080808] font-semibold" style={{ fontSize: 'clamp(34px, 4.5vw, 56px)', lineHeight: 0.92 }}>
              {product.name}
            </h1>

            {/* Scent Description */}
            <p className="text-sm md:text-base leading-relaxed mb-5 max-w-lg text-[#080808]/55 font-light">
              {product.scentDescription || product.description}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Concentration', value: concentration, icon: 'ri-drop-fill' },
                { label: 'Longevity', value: longevity, icon: 'ri-time-line' },
                { label: 'Projection', value: projection, icon: 'ri-broadcast-line' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl p-3.5 text-center" style={{ background: '#F8F5F0', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <i className={`${stat.icon} text-lg mb-1 block`} style={{ color: '#C4A44A' }} />
                  <p className="text-sm font-bold text-[#080808]">{stat.value}</p>
                  <p className="text-[9px] text-[#080808]/25 tracking-wider uppercase font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center rounded-full overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-[#080808]/3 transition-colors text-[#080808]">
                  <i className="ri-subtract-line text-base" />
                </button>
                <span className="text-base px-4 font-semibold text-[#080808]">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-[#080808]/3 transition-colors text-[#080808]">
                  <i className="ri-add-line text-base" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 rounded-full text-sm tracking-[0.08em] font-semibold transition-all duration-400 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer text-white"
                style={{ background: added ? '#C4A44A' : '#080808' }}
              >
                {added ? 'ADDED TO BAG' : `ADD TO BAG — €${price * qty}`}
              </button>
            </div>

            {/* Total */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-bold text-[#080808]">€{price * qty}</span>
              <span className="text-xs text-[#080808]/20">Complimentary shipping on orders over €200</span>
            </div>

            {/* Occasion + Season */}
            {(product.occasion || product.season) && (
              <div className="flex items-center gap-4 text-xs text-[#080808]/35">
                {product.occasion && (
                  <div className="flex items-center gap-1.5">
                    <i className="ri-calendar-line text-sm" style={{ color: '#C4A44A' }} />
                    <span>{product.occasion}</span>
                  </div>
                )}
                {product.season && (
                  <div className="flex items-center gap-1.5">
                    <i className="ri-sun-line text-sm" style={{ color: '#C4A44A' }} />
                    <span>{product.season}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Full Width Sections Below */}
        <div className="mt-12 md:mt-16">
          {/* Scent Profile — Notes */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <p className="text-[#8C1C28]/30 text-[10px] tracking-[0.4em] uppercase font-medium mb-2">Scent Profile</p>
              <h2 className="serif text-[#080808] italic text-3xl md:text-4xl font-semibold">THE <span style={{ color: '#8C1C28' }}>COMPOSITION</span></h2>
            </div>

            {/* Notes Pyramid */}
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
              {/* Top Notes */}
              <div className="text-center w-full">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#080808]/30 mb-3 font-semibold">Top Notes</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {topNotes.map((n) => (
                    <span key={n} className="px-4 py-2 rounded-full text-sm serif italic font-medium" style={{ background: '#F8F5F0', color: '#080808', border: '1px solid rgba(0,0,0,0.04)' }}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider arrow */}
              <div className="flex items-center justify-center">
                <i className="ri-arrow-down-s-line text-xl" style={{ color: '#C4A44A' }} />
              </div>

              {/* Heart Notes */}
              <div className="text-center w-full">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#080808]/30 mb-3 font-semibold">Heart Notes</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {heartNotes.map((n) => (
                    <span key={n} className="px-4 py-2 rounded-full text-sm serif italic font-medium" style={{ background: '#F8F5F0', color: '#080808', border: '1px solid rgba(196,164,74,0.15)' }}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider arrow */}
              <div className="flex items-center justify-center">
                <i className="ri-arrow-down-s-line text-xl" style={{ color: '#C4A44A' }} />
              </div>

              {/* Base Notes */}
              <div className="text-center w-full">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#080808]/30 mb-3 font-semibold">Base Notes</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {baseNotes.map((n) => (
                    <span key={n} className="px-4 py-2 rounded-full text-sm serif italic font-medium" style={{ background: '#080808', color: '#F0EBE3' }}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Packaging & Quality */}
          <div
            className="rounded-2xl p-8 md:p-10 mb-10 max-w-3xl mx-auto"
            style={{ background: '#F8F5F0', border: '1px solid rgba(196,164,74,0.1)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-vip-crown-line text-lg" style={{ color: '#C4A44A' }} />
              <h3 className="serif text-[#080808] text-xl italic font-semibold">Premium Packaging & Quality</h3>
            </div>
            <p className="text-[#080808]/50 text-sm leading-relaxed mb-4">
              {product.packagingDescription || `Every EXTRAITY fragrance arrives in a matte black presentation box with gold foil detailing. Each 50ml bottle is crafted from heavy European glass with a magnetic cap and precision atomizer. The bottle is designed to be kept — a permanent addition to your dressing table, not disposable packaging.`}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-[#080808]/35">
              <div className="flex items-center gap-1.5">
                <i className="ri-checkbox-circle-line text-sm" style={{ color: '#C4A44A' }} />
                Heavy European Glass
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-checkbox-circle-line text-sm" style={{ color: '#C4A44A' }} />
                Magnetic Cap
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-checkbox-circle-line text-sm" style={{ color: '#C4A44A' }} />
                Gold Foil Box
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-checkbox-circle-line text-sm" style={{ color: '#C4A44A' }} />
                Precision Atomizer
              </div>
            </div>
          </div>

          {/* Compare with Original */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="text-center mb-8">
              <p className="text-[#8C1C28]/30 text-[10px] tracking-[0.4em] uppercase font-medium mb-2">Why Choose EXTRAITY</p>
              <h2 className="serif text-[#080808] italic text-3xl md:text-4xl font-semibold">COMPARE WITH <span style={{ color: '#8C1C28' }}>ORIGINAL</span></h2>
            </div>

            <div className="rounded-2xl p-6 md:p-8" style={{ background: '#F8F5F0', border: '1px solid rgba(0,0,0,0.03)' }}>
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch mb-6">
                {/* Inspiration Image */}
                <div className="w-24 h-28 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <img src={product.inspiredBy.img} alt={product.inspiredBy.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xs tracking-[0.25em] uppercase text-[#8C1C28]/50 font-semibold mb-1">Inspiration Source</p>
                  <p className="serif text-[#080808] text-2xl md:text-3xl italic font-semibold mb-1">{product.inspiredBy.name}</p>
                  <p className="text-sm text-[#080808]/40 mb-2">by {product.inspiredBy.designer}</p>
                  <p className="text-sm text-[#080808]/50">Retail price: <span className="font-bold text-[#8C1C28]">€{product.inspiredBy.price}</span></p>
                </div>
              </div>

              {/* Comparison Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-4 text-center" style={{ background: '#FCFAF7', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#080808]/30 font-semibold mb-2">The Original</p>
                  <p className="text-xs text-[#080808]/45 leading-relaxed">
                    Iconic composition at designer retail pricing. Premium brand heritage with luxury markup. Often reformulated over the years.
                  </p>
                </div>
                <div className="rounded-xl p-4 text-center" style={{ background: '#FCFAF7', border: '1px solid rgba(196,164,74,0.15)' }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: '#C4A44A' }}>EXTRAITY</p>
                  <p className="text-xs text-[#080808]/45 leading-relaxed">
                    {product.compareSection?.ourApproach || `Inspired by the same olfactory vision, crafted at 30% extrait concentration. Exceptional performance at a fraction of the cost. European-made, cruelty-free, uncompromising quality.`}
                  </p>
                </div>
              </div>

              <p className="text-center text-[10px] text-[#080808]/20 mt-5 italic">
                EXTRAITY fragrances are original compositions inspired by the olfactory families of luxury scents. We are not affiliated with any designer brand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}