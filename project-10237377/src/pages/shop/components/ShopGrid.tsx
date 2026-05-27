import { useEffect, useRef, useState } from 'react';
import { allProducts, type FragranceFamily } from '@/mocks/products';
import ProductCard from '@/components/feature/ProductCard';

type CategoryFilter = 'ALL' | 'MEN' | 'WOMEN' | 'UNISEX' | 'BUNDLES';

const ITEMS_PER_PAGE = 20;

const categoryFilters: CategoryFilter[] = ['ALL', 'MEN', 'WOMEN', 'UNISEX'];

const familyFilters: { label: string; value: FragranceFamily | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Fresh', value: 'Fresh' },
  { label: 'Floral', value: 'Floral' },
  { label: 'Woody', value: 'Woody' },
  { label: 'Gourmand', value: 'Gourmand' },
  { label: 'Oriental', value: 'Oriental' },
  { label: 'Leather', value: 'Leather' },
  { label: 'Amber', value: 'Amber' },
  { label: 'Smoky', value: 'Smoky' },
];

function getProductFamily(product: typeof allProducts[0]): string {
  if (product.fragranceFamily) return product.fragranceFamily;
  const map: Record<string, string> = {
    floral: 'Floral', woody: 'Woody', gourmand: 'Gourmand',
    fresh: 'Fresh', leather: 'Leather', smoky: 'Smoky', oriental: 'Oriental',
  };
  return map[product.note || ''] || 'Floral';
}

export default function ShopGrid() {
  const [cat, setCat] = useState<CategoryFilter>('ALL');
  const [family, setFamily] = useState<FragranceFamily | 'ALL'>('ALL');
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { setPage(0); }, [cat, family]);

  let filtered = allProducts.filter((p) => p.category !== 'BUNDLES');
  if (cat !== 'ALL') filtered = filtered.filter((p) => p.category === cat);
  if (family !== 'ALL') filtered = filtered.filter((p) => getProductFamily(p) === family);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <section id="products" ref={ref} className="w-full" style={{ background: '#FCFAF7' }}>
      {/* Filter bar */}
      <div className="sticky top-0 z-30 px-4 md:px-8 lg:px-16 py-4" style={{ background: '#FCFAF7', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-3">
          {categoryFilters.map((f) => (
            <button
              key={f}
              onClick={() => setCat(f)}
              className="px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer flex-shrink-0"
              style={{
                background: cat === f ? '#080808' : '#FCFAF7',
                color: cat === f ? '#FCFAF7' : '#666',
                border: cat === f ? 'none' : '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Family filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] tracking-[0.2em] text-[#080808]/25 uppercase mr-2 flex-shrink-0 whitespace-nowrap font-medium">Family</span>
          {familyFilters.map((nf) => (
            <button
              key={nf.value}
              onClick={() => setFamily(nf.value)}
              className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap cursor-pointer flex-shrink-0"
              style={{
                background: family === nf.value ? '#8C1C28' : 'transparent',
                color: family === nf.value ? '#fff' : '#888',
                border: family === nf.value ? 'none' : '1px solid rgba(0,0,0,0.05)',
              }}
            >
              {nf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="px-4 md:px-8 lg:px-16 pt-6 md:pt-8 pb-16" data-product-shop>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <i className="ri-emotion-sad-line text-3xl mb-3" style={{ color: '#8C1C28' }} />
            <p className="serif text-[#080808]/30 text-lg italic">No fragrances match these filters</p>
            <button
              onClick={() => { setCat('ALL'); setFamily('ALL'); }}
              className="mt-3 px-5 py-2 rounded-full text-xs font-medium text-[#080808]/40 hover:text-[#080808] transition-colors cursor-pointer"
              style={{ border: '1px solid rgba(0,0,0,0.08)' }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
              {paginated.map((p, i) => (
                <ProductCard key={p.id} product={p} variant="grid" animate visible={visible} delay={i * 35} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 disabled:opacity-20"
                  style={{ background: page === 0 ? 'rgba(0,0,0,0.02)' : '#080808' }}
                >
                  <i className="ri-arrow-left-s-line text-base" style={{ color: page === 0 ? '#999' : '#fff' }} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer"
                    style={{
                      background: page === i ? '#080808' : 'rgba(0,0,0,0.02)',
                      color: page === i ? '#fff' : '#999',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 disabled:opacity-20"
                  style={{ background: page === totalPages - 1 ? 'rgba(0,0,0,0.02)' : '#080808' }}
                >
                  <i className="ri-arrow-right-s-line text-base" style={{ color: page === totalPages - 1 ? '#999' : '#fff' }} />
                </button>
              </div>
            )}
            <p className="text-center text-xs text-[#080808]/20 mt-4">
              Showing {filtered.length === 0 ? 0 : page * ITEMS_PER_PAGE + 1}–{Math.min((page + 1) * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} fragrances
            </p>
          </>
        )}
      </div>
    </section>
  );
}