import { useEffect, useState } from 'react';

const BOTTLE_IMG = 'https://public.readdy.ai/ai/img_res/a9a0c1d0-2b68-4754-b632-ceedd623559f.png';

export default function AboutHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-end overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Large watermark */}
      <span
        className="serif absolute select-none pointer-events-none italic"
        style={{
          fontSize: '44vw',
          lineHeight: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -48%)',
          color: 'rgba(255,255,255,0.025)',
          letterSpacing: '-6px',
          whiteSpace: 'nowrap',
        }}
      >
        EXTRAITY
      </span>

      {/* Bottle image on the right */}
      <div
        className={`absolute right-[-4%] top-0 bottom-0 w-[58%] z-10 transition-all duration-1200 ${loaded ? 'opacity-100' : 'opacity-0 translate-x-8'}`}
      >
        <img
          src={BOTTLE_IMG}
          alt="Extraity 30% extrait perfume"
          className="w-full h-full object-contain"
          style={{
            objectPosition: 'center center',
            filter: 'drop-shadow(0 0 60px rgba(201,168,76,0.15)) drop-shadow(0 15px 40px rgba(0,0,0,0.6))',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      <div className="relative z-20 px-8 lg:px-20 pt-40 pb-24 max-w-2xl">
        <div className={`transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-6 font-medium">
            &#8212;&nbsp;&nbsp;Our mission&nbsp;&nbsp;&#8212;
          </p>
          <h1
            className="serif text-white leading-none mb-8 italic"
            style={{ fontSize: 'clamp(58px, 8vw, 120px)', lineHeight: 0.87 }}
          >
            EUROPE'S<br />
            <span style={{ color: '#C9A84C' }}>FIRST</span><br />
            30% EXTRAIT<br />
            <span style={{ color: '#9B2226' }}>ONLY</span>
            <span style={{ color: '#C9A84C' }}>.</span>
          </h1>
        </div>
        <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            We founded <strong className="text-[#C9A84C]">EXTRAITY</strong> with one radical idea: sell nothing but 30% concentration extrait perfumes. No diluted waters. No cheap imitations. Just pure, potent, long-lasting fragrance — delivered anywhere in Europe within days.
          </p>
        </div>
      </div>

    </section>
  );
}