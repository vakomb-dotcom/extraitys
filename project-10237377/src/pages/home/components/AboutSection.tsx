import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full flex flex-col lg:flex-row" style={{ background: '#FCFAF7' }}>
      {/* Women */}
      <Link
        to="/women"
        className="relative w-full lg:w-1/2 flex flex-col items-center justify-center overflow-hidden cursor-pointer group block"
        style={{ minHeight: '44vh', textDecoration: 'none' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=elegant%20feminine%20composition%20with%20delicate%20peony%20petals%20rose%20de%20mai%20and%20soft%20amber%20liquid%20perfume%20drops%20on%20warm%20ivory%20silk%20fabric%2C%20artistic%20abstract%20luxury%20beauty%2C%20soft%20diffused%20golden%20lighting%2C%20minimal%20sophisticated%20aesthetic%2C%20premium%20fragrance%20mood%2C%20gentle%20flowing%20feminine%20shapes%2C%20artisan%20perfume%20brand%20visual&width=1000&height=1000&seq=about-women-v5&orientation=squarish"
            alt="Women's Collection"
            className="w-full h-full object-cover object-center transition-transform duration-1200 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(45,20,25,0.92) 0%, rgba(45,20,25,0.35) 50%, transparent 100%)' }} />

        <div
          className={`relative z-10 text-center px-6 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-white/45 text-xs tracking-[0.35em] uppercase mb-4 font-medium">Floral · Gourmand · Oriental</p>
          <h2
            className="serif text-white italic leading-none mb-4 font-semibold"
            style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}
          >
            WOMEN
          </h2>
          <span className="inline-block text-white/80 text-sm tracking-wider px-7 py-3 rounded-full border border-white/25 group-hover:bg-white group-hover:text-[#2D1419] group-hover:border-white transition-all duration-500">
            EXPLORE COLLECTION
          </span>
        </div>
      </Link>

      {/* Men */}
      <Link
        to="/men"
        className="relative w-full lg:w-1/2 flex flex-col items-center justify-center overflow-hidden cursor-pointer group block"
        style={{ minHeight: '44vh', textDecoration: 'none' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=sophisticated%20masculine%20composition%20with%20rich%20amber%20resin%20dark%20tobacco%20leaves%20and%20warm%20sandalwood%20on%20deep%20charcoal%20surface%2C%20artistic%20abstract%20luxury%20aesthetic%2C%20warm%20cognac%20amber%20gradient%2C%20soft%20dramatic%20shadows%2C%20minimal%20modern%20design%2C%20premium%20cologne%20mood%2C%20refined%20masculine%20shapes%2C%20artisan%20perfume%20brand%20visual&width=1000&height=1000&seq=about-men-v5&orientation=squarish"
            alt="Men's Collection"
            className="w-full h-full object-cover object-center transition-transform duration-1200 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,15,10,0.92) 0%, rgba(20,15,10,0.35) 50%, transparent 100%)' }} />

        <div
          className={`relative z-10 text-center px-6 transition-all duration-1000 delay-350 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <p className="text-white/45 text-xs tracking-[0.35em] uppercase mb-4 font-medium">Woody · Leather · Fresh</p>
          <h2
            className="serif text-white italic leading-none mb-4 font-semibold"
            style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}
          >
            MEN
          </h2>
          <span className="inline-block text-white/80 text-sm tracking-wider px-7 py-3 rounded-full border border-white/25 group-hover:bg-white group-hover:text-[#140F0A] group-hover:border-white transition-all duration-500">
            EXPLORE COLLECTION
          </span>
        </div>
      </Link>
    </section>
  );
}