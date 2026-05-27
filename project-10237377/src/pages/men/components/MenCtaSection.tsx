import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MenCtaSection() {
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
    <section ref={ref} className="w-full relative overflow-hidden" style={{ background: '#1A1512', minHeight: '280px' }}>
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://readdy.ai/api/search-image?query=luxury%20perfume%20bottles%20collection%2C%20elegant%20dark%20glass%20bottles%20with%20gold%20accents%2C%20warm%20dark%20taupe%20background%2C%20professional%20product%20photography%2C%20artisan%20perfumery%2C%20sophisticated%20display%2C%20golden%20details%2C%20dramatic%20soft%20lighting&width=1400&height=400&seq=men-cta-bg-v3&orientation=landscape"
          alt="Luxury perfume collection"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1512] via-[#1A1512]/95 to-[#1A1512]/70" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-5 md:px-12 lg:px-20 py-14 gap-8">
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <h2 className="serif text-white leading-none italic font-semibold" style={{ fontSize: 'clamp(28px, 4.5vw, 50px)' }}>
            FIND YOUR<br />
            <span style={{ color: '#C4A44A' }}>SIGNATURE</span>
          </h2>
        </div>

        <div className={`flex gap-4 transition-all duration-800 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <Link
            to="/shop"
            className="px-7 py-3.5 rounded-full serif text-base tracking-wider transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer italic font-medium"
            style={{ background: '#C4A44A', color: '#080808' }}
          >
            SHOP MEN
          </Link>
          <Link
            to="/"
            className="px-7 py-3.5 rounded-full serif text-base tracking-wider border transition-all duration-300 whitespace-nowrap cursor-pointer italic"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
          >
            HOME
          </Link>
        </div>
      </div>
    </section>
  );
}