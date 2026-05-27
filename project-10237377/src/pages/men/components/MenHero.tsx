import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MenHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-start overflow-hidden" style={{ background: '#1A1512' }}>
      <span
        className="serif absolute select-none pointer-events-none"
        style={{
          fontSize: '55vw',
          lineHeight: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgba(196,164,74,0.03)',
          letterSpacing: '-10px',
        }}
      >
        MEN
      </span>

      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1512] via-[#1A1512]/80 to-transparent pointer-events-none" />

      <div
        className={`absolute right-0 top-0 bottom-0 w-1/2 transition-all duration-1200 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
      >
        <img
          src="https://readdy.ai/api/search-image?query=handsome%20masculine%20man%20applying%20luxury%20cologne%2C%20elegant%20dark%20suit%2C%20sophisticated%20gentleman%2C%20dark%20charcoal%20background%2C%20professional%20lifestyle%20photography%2C%20premium%20perfume%20advertisement%2C%20dramatic%20soft%20lighting%2C%20confident%20expression%2C%20luxury%20scent&width=900&height=1000&seq=men-hero-v2&orientation=portrait"
          alt="Man applying cologne"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A1512]" />
      </div>

      <div className="relative z-10 px-10 lg:px-20 pt-36 pb-20 max-w-2xl min-h-screen flex flex-col justify-center">
        <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-[#C4A44A]/50 text-sm tracking-[0.4em] uppercase mb-10 font-medium">Men's Collection</p>
          <h1 className="serif text-white leading-none mb-6 italic font-semibold" style={{ fontSize: 'clamp(44px, 7vw, 100px)', lineHeight: 0.9 }}>
            FIND<br />
            <span style={{ color: '#8C1C28' }}>YOUR</span><br />
            SIGNATURE<br />
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.3)', color: 'transparent' } as React.CSSProperties}>SCENT</span>
          </h1>
        </div>
        <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-md">
            Every moment demands its own fragrance. From boardroom bold to evening intrigue — discover the scent that speaks before you do.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#life-stages"
              className="px-8 py-4 rounded-full serif text-base tracking-wider transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer italic font-medium"
              style={{ background: '#C4A44A', color: '#080808' }}
            >
              EXPLORE GUIDE
            </a>
            <Link
              to="/shop"
              className="px-8 py-4 rounded-full serif text-base tracking-wider border transition-all duration-300 whitespace-nowrap cursor-pointer italic"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
            >
              SHOP MEN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}