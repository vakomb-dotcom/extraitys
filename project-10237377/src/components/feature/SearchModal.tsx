import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '@/mocks/products';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function getFamilyLabel(product: typeof allProducts[0]): string {
  if (product.fragranceFamily) return product.fragranceFamily;
  const map: Record<string, string> = {
    floral: 'Floral', woody: 'Woody', gourmand: 'Gourmand',
    fresh: 'Fresh', leather: 'Leather', smoky: 'Smoky', oriental: 'Oriental',
  };
  return map[product.note || ''] || 'Floral';
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof allProducts>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sub.toLowerCase().includes(q) ||
        p.inspiredBy.name.toLowerCase().includes(q) ||
        p.inspiredBy.designer.toLowerCase().includes(q) ||
        getFamilyLabel(p).toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-lg transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-0 left-0 right-0 z-[90] flex flex-col items-center pt-24 px-4">
        <div className="w-full max-w-xl">
          <div
            className="flex items-center gap-4 px-5 py-4 rounded-2xl"
            style={{
              background: 'rgba(8,8,8,0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(196,164,74,0.12)',
            }}
          >
            <i className="ri-search-line text-[#C4A44A]/50 text-xl" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fragrances..."
              className="flex-1 bg-transparent text-white text-base serif italic placeholder-white/25 outline-none border-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/8 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-white/40 text-lg" />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/8 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-white text-2xl" />
            </button>
          </div>

          {query.trim() && (
            <div
              className="mt-3 rounded-2xl overflow-hidden max-h-[55vh] overflow-y-auto"
              style={{
                background: 'rgba(8,8,8,0.94)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(196,164,74,0.08)',
              }}
            >
              {results.length === 0 ? (
                <div className="px-6 py-10 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(196,164,74,0.08)' }}>
                    <i className="ri-emotion-sad-line text-2xl" style={{ color: '#C4A44A' }} />
                  </div>
                  <p className="serif text-white/40 text-xl italic mb-1">No results found</p>
                  <p className="text-white/25 text-sm">Try a different fragrance name or family</p>
                </div>
              ) : (
                <div className="p-3">
                  <p className="text-white/20 text-xs tracking-[0.15em] uppercase px-3 py-2 font-medium">
                    {results.length} {results.length === 1 ? 'Fragrance' : 'Fragrances'}
                  </p>
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      to={`/shop/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/4 transition-colors cursor-pointer group"
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="w-14 h-16 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ background: p.bg }}
                      >
                        <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="serif text-white text-base italic truncate font-medium">{p.name}</p>
                        <p className="text-white/35 text-sm truncate mt-0.5">{p.sub}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(196,164,74,0.1)', color: '#C4A44A' }}>
                            {getFamilyLabel(p)}
                          </span>
                          <span className="text-white/25 text-xs">via {p.inspiredBy.name}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="serif text-white text-lg italic font-semibold">€{p.price}</p>
                      </div>
                      <i className="ri-arrow-right-up-line text-white/25 group-hover:text-[#C4A44A] transition-colors text-lg" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}