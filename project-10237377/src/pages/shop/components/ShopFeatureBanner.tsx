import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShopFeatureBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full px-4 md:px-8 lg:px-16 py-8" style={{ background: '#F8F5F0' }}>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <Link
          to="/women"
          className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ aspectRatio: '4/3' }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=elegant%20woman%20silhouette%20with%20luxury%20perfume%20bottle%2C%20deep%20burgundy%20and%20warm%20ivory%20tones%2C%20soft%20warm%20lighting%2C%20premium%20feminine%20fragrance%20aesthetic%2C%20minimalist%20artistic%20luxury&width=600&height=450&seq=shop-banner-women-v2&orientation=landscape"
            alt="Women's Collection"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white/50 text-[11px] tracking-widest uppercase mb-1 font-medium">For Her</p>
            <p className="serif text-white text-xl italic leading-tight">Women's Collection</p>
          </div>
        </Link>

        <Link
          to="/men"
          className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ aspectRatio: '4/3' }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=elegant%20man%20silhouette%20with%20luxury%20cologne%20bottle%2C%20deep%20charcoal%20and%20warm%20cognac%20tones%2C%20soft%20dramatic%20lighting%2C%20premium%20masculine%20fragrance%20aesthetic%2C%20minimalist%20artistic%20luxury&width=600&height=450&seq=shop-banner-men-v2&orientation=landscape"
            alt="Men's Collection"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white/50 text-[11px] tracking-widest uppercase mb-1 font-medium">For Him</p>
            <p className="serif text-white text-xl italic leading-tight">Men's Collection</p>
          </div>
        </Link>
      </div>
    </section>
  );
}