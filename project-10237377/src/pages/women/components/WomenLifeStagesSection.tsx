import { useEffect, useRef, useState } from 'react';
import { allProducts } from '@/mocks/products';
import ProductCard from '@/components/feature/ProductCard';

const womenProducts = allProducts.filter((p) => p.category === 'WOMEN').slice(0, 20);

export default function WomenLifeStagesSection() {
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

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 540 : -540, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-8 md:py-12" style={{ background: '#F5F0EB' }}>
      <div className="px-5 md:px-12 lg:px-20 mb-8">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <p className="text-[#E07A5F]/50 text-xs tracking-[0.35em] uppercase mb-2">For her</p>
          <h2 className="serif text-[#1A1A1A] leading-none italic font-semibold" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
            WOMEN'S <span style={{ color: '#E07A5F' }}>COLLECTION</span>
          </h2>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
          style={{ background: '#E07A5F' }}
        >
          <i className="ri-arrow-left-s-line text-white text-lg" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
          style={{ background: '#E07A5F' }}
        >
          <i className="ri-arrow-right-s-line text-white text-lg" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto px-5 md:px-20 pb-1 no-scrollbar"
        >
          {womenProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} variant="horizontal" animate visible={visible} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}