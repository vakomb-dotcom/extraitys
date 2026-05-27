import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function WomenHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-start overflow-hidden" style={{ background: '#1A1015' }}>
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
        WOMEN
      </span>

      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1015] via-[#1A1015]/80 to-transparent pointer-events-none" />

      <div
        className={`absolute right-0 top-0 bottom-0 w-1/2 transition-all duration-1200 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
      >
        <img
          src="https://readdy.ai/api/search-image?query=elegant%20beautiful%20woman%20holding%20luxury%20perfume%20bottle%2C%20sophisticated%20evening%20dress%2C%20graceful%20pose%2C%20warm%20burgundy%20background%2C%20professional%20lifestyle%20photography%2C%20premium%20perfume%20advertisement%2C%20soft%20natural%20lighting%2C%20confident%20elegant%20expression%2C%20luxury%20scent&width=900&height=1000&seq=women-hero-v2&orientation=portrait"
          alt="Woman with perfume"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A1015]" />
      </div>

      <div className="relative z-10 px-10 lg:px-20 pt-36 pb-20 max-w-2xl min-h-screen flex flex-col justify-center">
        <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-[#C4A44A]/50 text-sm tracking-[0.4em] uppercase mb-8 font-medium">Women's Collection</p>
          <h1 className="serif text-white leading-none mb-6 italic font-semibold" style={{ fontSize: 'clamp(44px, 7vw, 100px)', lineHeight: 0.9 }}>
            DISCOVER<br />
            <span style={{ color: '#C4A44A' }}>YOUR</span><br />
            ESSENCE<br />
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.3)', color: 'transparent' } as React.CSSProperties}>TRUE</span>
          </h1>
        </div>
        <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-md">
            Your fragrance is your invisible signature — the final touch that completes your presence. Find the scent that tells your story.
          </p>
          <div className="flex items-center gap-4">
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
              SHOP WOMEN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}