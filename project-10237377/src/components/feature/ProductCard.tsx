import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/mocks/products';
import { useCart, addProductToCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'horizontal';
  animate?: boolean;
  delay?: number;
  visible?: boolean;
}

function getFragranceFamily(product: Product): string {
  if (product.fragranceFamily) return product.fragranceFamily;
  const noteMap: Record<string, string> = {
    floral: 'Floral', woody: 'Woody', gourmand: 'Gourmand',
    fresh: 'Fresh', leather: 'Leather', smoky: 'Smoky', oriental: 'Oriental',
  };
  return noteMap[product.note || ''] || 'Floral';
}

function getConcentration(product: Product): string {
  return product.concentration || '30% Extrait';
}

function getLongevity(product: Product): string {
  return product.longevity || '12h+';
}

export default function ProductCard({ product, variant = 'grid', animate = true, delay = 0, visible = true }: ProductCardProps) {
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const family = getFragranceFamily(product);
  const concentration = getConcentration(product);
  const longevity = getLongevity(product);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    addProductToCart(product, defaultSize.label, defaultSize.price, addItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((w) => !w);
  };

  const moodLabel = product.moodLabels?.[0] || product.tag;

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/shop/${product.slug}`}
        className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer block transition-all duration-500 group"
        style={{
          width: '290px',
          transform: animate && !visible ? 'translateY(20px)' : 'translateY(0)',
          textDecoration: 'none',
          background: '#FCFAF7',
          border: '1px solid rgba(0,0,0,0.04)',
          opacity: animate && !visible ? 0 : 1,
          transitionDelay: animate ? `${delay}ms` : '0ms',
        }}
        data-product-shop
      >
        {/* Photo */}
        <div className="w-full relative flex items-center justify-center bg-[#F8F5F0]" style={{ aspectRatio: '3/4' }}>
          <img src={product.img} alt={product.name} className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105" />
          {/* Family Tag */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <span className="text-[10px] px-3 py-1.5 rounded-full italic whitespace-nowrap font-medium tracking-wider" style={{ background: 'rgba(8,8,8,0.8)', color: '#C4A44A' }}>
              {family}
            </span>
          </div>
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 z-10"
            style={{ background: 'rgba(255,255,255,0.85)' }}
          >
            <i className={`${wishlist ? 'ri-heart-fill' : 'ri-heart-line'} text-base`} style={{ color: wishlist ? '#8C1C28' : '#999' }} />
          </button>
          {/* Mood Label */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: 'rgba(8,8,8,0.65)', color: '#F0EBE3' }}>
              {moodLabel}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pb-4 pt-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[#080808]/25 text-[10px] tracking-[0.25em] uppercase font-medium">{family} · {concentration}</p>
          </div>
          <p className="serif text-[#080808] text-xl leading-tight mt-0.5 italic font-semibold tracking-[-0.01em]">{product.name}</p>

          {/* Longevity & Category Row */}
          <div className="flex items-center gap-3 mt-1.5 mb-3">
            <div className="flex items-center gap-1 text-[10px] text-[#080808]/35">
              <i className="ri-time-line text-xs" />
              <span>{longevity}</span>
            </div>
            <div className="w-px h-3 bg-[#080808]/10" />
            <span className="text-[10px] text-[#080808]/35">{product.category}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#080808] text-xl font-semibold">€{product.price}</span>
            <button
              onClick={handleAdd}
              className="px-5 py-2.5 rounded-full text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 text-white tracking-wider"
              style={{ background: added ? '#C4A44A' : '#080808' }}
            >
              {added ? 'ADDED' : 'ADD TO BAG'}
            </button>
          </div>

          {/* Inspired By */}
          <div className="mt-3.5 pt-3.5 rounded-lg px-3 py-3" style={{ background: '#F8F5F0', border: '1px solid rgba(196,164,74,0.15)' }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#080808]/40 text-[9px] tracking-[0.3em] uppercase font-semibold">Inspiration</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-17 rounded-lg overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
                <img src={product.inspiredBy.img} alt={product.inspiredBy.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[#080808] text-sm leading-tight font-bold truncate">{product.inspiredBy.name}</p>
                <p className="text-[#080808]/35 text-[11px] truncate mt-0.5">{product.inspiredBy.designer}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[#080808]/25 text-[9px] leading-none">Retail</p>
                <p className="text-base font-bold" style={{ color: '#8C1C28' }}>€{product.inspiredBy.price}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant
  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group rounded-xl overflow-hidden cursor-pointer block transition-all duration-500"
      style={{
        transform: animate && !visible ? 'translateY(20px)' : 'translateY(0)',
        textDecoration: 'none',
        background: '#FCFAF7',
        border: '1px solid rgba(0,0,0,0.04)',
        opacity: animate && !visible ? 0 : 1,
        transitionDelay: animate ? `${delay}ms` : '0ms',
      }}
      data-product-shop
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden bg-[#F8F5F0]" style={{ aspectRatio: '3/4' }}>
        <img src={product.img} alt={product.name} className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="text-[9px] px-2.5 py-1 rounded-full italic whitespace-nowrap font-medium tracking-wider" style={{ background: 'rgba(8,8,8,0.8)', color: '#C4A44A' }}>
            {family}
          </span>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: 'rgba(8,8,8,0.6)', color: '#F0EBE3' }}>
            {moodLabel}
          </span>
        </div>
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 z-10"
          style={{ background: 'rgba(255,255,255,0.85)' }}
        >
          <i className={`${wishlist ? 'ri-heart-fill' : 'ri-heart-line'} text-sm`} style={{ color: wishlist ? '#8C1C28' : '#999' }} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 md:p-3.5">
        <p className="text-[#080808]/25 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium">{family} · {concentration}</p>
        <p className="serif text-[#080808] text-sm sm:text-base leading-tight mt-0.5 italic font-semibold tracking-[-0.01em]">{product.name}</p>

        <div className="flex items-center gap-2 mt-1.5 mb-2.5">
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-[#080808]/30">
            <i className="ri-time-line text-[10px]" />
            <span>{longevity}</span>
          </div>
          <div className="w-px h-2.5 bg-[#080808]/10" />
          <span className="text-[9px] sm:text-[10px] text-[#080808]/30">{product.category}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#080808] text-lg sm:text-xl font-semibold">€{product.price}</span>
          <button
            onClick={handleAdd}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 text-white tracking-wider"
            style={{ background: added ? '#C4A44A' : '#080808' }}
          >
            {added ? 'ADDED' : 'ADD'}
          </button>
        </div>

        {/* Inspired By — compact */}
        <div className="mt-2.5 rounded-lg px-2 py-2" style={{ background: '#F8F5F0', border: '1px solid rgba(196,164,74,0.12)' }}>
          <div className="flex items-center gap-2">
            <div className="w-11 h-14 rounded-md overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(0,0,0,0.03)' }}>
              <img src={product.inspiredBy.img} alt={product.inspiredBy.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[#080808] text-[11px] sm:text-xs leading-tight font-bold truncate">{product.inspiredBy.name}</p>
              <p className="text-[#080808]/35 text-[9px] sm:text-[10px] truncate">{product.inspiredBy.designer}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[#080808]/25 text-[7px] leading-none">Retail</p>
              <p className="text-sm font-bold" style={{ color: '#8C1C28' }}>€{product.inspiredBy.price}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}