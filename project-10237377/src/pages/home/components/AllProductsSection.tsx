import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '@/mocks/products';
import ProductCard from '@/components/feature/ProductCard';

type ShopTab = 'ALL' | 'MEN' | 'WOMEN';

export default function AllProductsSection() {
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<ShopTab>('ALL');
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

  const filtered = allProducts
    .filter((p) => p.category !== 'BUNDLES')
    .filter((p) => tab === 'ALL' ? true : p.category === tab)
    .slice(0, 16);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 620 : -620, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16" style={{ background: '#FCFAF7' }}>
      <div className="px-5 md:px-10 lg:px-16">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-[#8C1C28]/40 text-[11px] tracking-[0.4em] uppercase mb-2 font-medium">Complete Collection</p>
              <h2 className="serif text-[#080808] italic leading-none font-semibold" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
                SIGNATURE <span style={{ color: '#8C1C28' }}>SCENTS</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="serif text-sm tracking-[0.1em] text-[#080808]/40 hover:text-[#080808] transition-colors whitespace-nowrap italic flex items-center gap-1.5 cursor-pointer"
              style={{ textDecoration: 'none' }}
            >
              VIEW ALL
              <i className="ri-arrow-right-line text-base" />
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mb-6">
            {(['ALL', 'MEN', 'WOMEN'] as ShopTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer"
                style={{
                  background: tab === t ? '#080808' : '#FCFAF7',
                  color: tab === t ? '#FCFAF7' : '#666',
                  border: tab === t ? 'none' : '1px solid rgba(0,0,0,0.06)',
                }}
              >
                {t === 'ALL' ? 'All' : t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable row */}
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
          style={{ background: '#080808' }}
          aria-label="Scroll left"
        >
          <i className="ri-arrow-left-s-line text-white text-xl" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
          style={{ background: '#080808' }}
          aria-label="Scroll right"
        >
          <i className="ri-arrow-right-s-line text-white text-xl" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto px-5 md:px-16 pb-1 no-scrollbar scroll-smooth"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} variant="horizontal" animate visible={visible} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}