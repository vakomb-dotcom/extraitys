import { useEffect, useRef, useState, useCallback } from 'react';
import { allProducts, type Product } from '@/mocks/products';
import ProductCard from '@/components/feature/ProductCard';

interface Props {
  product: Product;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ProductRelated({ product }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSet, setCurrentSet] = useState<Product[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const getRandomProducts = useCallback(() => {
    const others = allProducts.filter((p) => p.slug !== product.slug);
    return shuffleArray(others).slice(0, 8);
  }, [product.slug]);

  useEffect(() => {
    setCurrentSet(getRandomProducts());
  }, [getRandomProducts]);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 270;
      scrollRef.current.scrollBy({ left: dir === 'right' ? cardWidth * 2 : -cardWidth * 2, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        const el = scrollRef.current;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
          setTimeout(() => setCurrentSet(getRandomProducts()), 400);
        } else {
          el.scrollBy({ left: 270, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, getRandomProducts]);

  return (
    <section className="w-full py-10 md:py-14 px-4 md:px-8 lg:px-16" style={{ background: '#F8F5F0' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#8C1C28]/30 text-[10px] tracking-[0.4em] uppercase mb-2 font-medium">You Might Also Love</p>
          <h2 className="serif text-[#080808] text-2xl md:text-3xl italic leading-none font-semibold">
            MORE <span style={{ color: '#8C1C28' }}>SCENTS</span>
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
            style={{ background: '#080808' }}
            aria-label="Scroll left"
          >
            <i className="ri-arrow-left-s-line text-white text-lg" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
            style={{ background: '#080808' }}
            aria-label="Scroll right"
          >
            <i className="ri-arrow-right-s-line text-white text-lg" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-1 no-scrollbar scroll-smooth px-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {currentSet.map((p) => (
              <div key={p.id} className="flex-shrink-0" style={{ width: '260px' }}>
                <ProductCard product={p} variant="grid" animate={false} visible />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}