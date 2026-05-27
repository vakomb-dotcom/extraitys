import { useEffect, useState } from 'react';

export default function ShopHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center" style={{ height: '50vh', minHeight: '380px' }}>
      <img
        src="https://readdy.ai/api/search-image?query=elegant%20row%20of%20luxury%20perfume%20bottles%20with%20gold%20accents%20and%20dark%20glass%20on%20soft%20ivory%20silk%20fabric%2C%20sophisticated%20minimal%20composition%2C%20warm%20natural%20lighting%20with%20gentle%20shadows%2C%20refined%20artisan%20fragrance%20brand%20aesthetic%2C%20deep%20black%20and%20warm%20golden%20tones%2C%20premium%20product%20photography%2C%20luxury%20editorial%20style&width=1400&height=700&seq=shop-hero-v3&orientation=landscape"
        alt="EXTRAITY Collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.78) 100%)' }} />

      <div className="relative z-10 text-center px-6 pt-8">
        <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[#C4A44A] text-[11px] tracking-[0.4em] uppercase mb-4 font-medium">European Craftsmanship</p>
          <h1 className="serif text-white leading-none italic mb-4 font-semibold" style={{ fontSize: 'clamp(36px, 7vw, 72px)' }}>
            30% <span style={{ color: '#8C1C28' }}>EXTRAIT</span>
          </h1>
          <p className="text-white/55 text-sm md:text-base max-w-md mx-auto mb-6 leading-relaxed font-light">
            Every fragrance formulated at the highest concentration. Exceptional longevity, refined character, European quality.
          </p>
          <p className="text-white/20 text-xs tracking-wider">
            {(['Fresh', 'Woody', 'Oriental', 'Floral', 'Gourmand', 'Leather']).join(' · ')}
          </p>
        </div>
      </div>
    </section>
  );
}