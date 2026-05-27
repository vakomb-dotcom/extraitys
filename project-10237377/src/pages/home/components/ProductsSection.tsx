import { useEffect, useRef, useState } from 'react';
import { allProducts } from '@/mocks/products';
import ProductCard from '@/components/feature/ProductCard';

const BEST_SELLERS = [601, 612, 616, 622, 624];

export default function ProductsSection() {
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bestSellers = allProducts.filter((p) => BEST_SELLERS.includes(p.id));

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 620 : -620, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="w-full relative py-12 md:py-16" style={{ background: '#FCFAF7' }}>
      <div className="px-4 md:px-10 mb-6 md:mb-8">
        <div className={`flex flex-col items-center text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[#8C1C28]/40 text-[11px] tracking-[0.4em] uppercase mb-3 font-medium">Curated Selection</p>
          <h2 className="serif text-[#080808] italic leading-none font-semibold mb-2" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            BEST <span style={{ color: '#8C1C28' }}>SELLERS</span>
          </h2>
          <p className="text-[#080808]/35 text-sm max-w-md">The fragrances our customers return for, again and again. Timeless quality, exceptional performance.</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          style={{ background: '#080808' }}
          aria-label="Scroll left"
        >
          <i className="ri-arrow-left-s-line text-white text-xl" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          style={{ background: '#080808' }}
          aria-label="Scroll right"
        >
          <i className="ri-arrow-right-s-line text-white text-xl" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-start gap-4 md:gap-5 overflow-x-auto px-4 md:px-12 py-2 no-scrollbar scroll-smooth"
        >
          {bestSellers.map((p, i) => (
            <ProductCard key={p.id} product={p} variant="horizontal" animate visible={visible} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}