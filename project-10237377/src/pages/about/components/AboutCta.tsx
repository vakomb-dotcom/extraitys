import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AboutCta() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: '#1A1A1A' }}>
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=luxury%20perfume%20bottle%20on%20dark%20surface%2C%20warm%20amber%20spotlight%2C%20elegant%20glass%20bottle%20with%20gold%20accents%2C%20premium%20fragrance%2C%20professional%20photography%2C%20dark%20moody%20background%2C%20sophisticated%20luxury%2C%20cinematic%20lighting%2C%20rich%20textures&width=1400&height=700&seq=about-cta-perfume-1&orientation=landscape"
          alt="Luxury perfume"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-[#1A1A1A]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A]/60" />
      </div>

      <div
        className={`relative z-10 px-10 lg:px-20 py-32 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <p className="text-[#C9A84C] text-sm tracking-[0.5em] uppercase mb-6 font-medium">
          &#8212;&nbsp;&nbsp;Experience true extrait&nbsp;&nbsp;&#8212;
        </p>
        <h2
          className="serif text-white leading-none mb-10 italic"
          style={{ fontSize: 'clamp(52px, 7.5vw, 110px)', lineHeight: 0.9 }}
        >
          FEEL THE<br />
          <span style={{ color: '#C9A84C' }}>DIFFERENCE</span><br />
          <span style={{ color: '#9B2226' }}>30%</span> EXTRAIT.
        </h2>
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            to="/shop"
            className="px-10 py-4 rounded-full serif text-base tracking-wider transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer italic"
            style={{ background: '#C9A84C', color: '#0A0A0A' }}
          >
            SHOP EXTRAIT
          </Link>
          <Link
            to="/men"
            className="px-10 py-4 rounded-full serif text-base tracking-wider border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap cursor-pointer italic"
          >
            EXPLORE MEN
          </Link>
        </div>
      </div>
    </section>
  );
}