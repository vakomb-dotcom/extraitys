import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HERO_BG = 'https://readdy.ai/api/search-image?query=three%20elegant%20luxury%20perfume%20bottles%20in%20deep%20black%20crystal%20glass%20with%20warm%20champagne%20gold%20metallic%20accents%20arranged%20on%20dark%20obsidian%20marble%20surface%2C%20soft%20diffused%20golden%20light%20creating%20dramatic%20luxury%20shadows%2C%20minimal%20sophisticated%20composition%2C%20premium%20European%20fragrance%20brand%20aesthetic%2C%20warm%20ivory%20glow%20behind%20bottles%2C%20artistic%20product%20photography%2C%20refined%20dark%20moody%20atmosphere&width=1800&height=900&seq=hero-extraity-v1&orientation=landscape';

export default function HeroSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1300),
      setTimeout(() => setStep(4), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" style={{ background: '#080808' }}>
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }
        @keyframes heroGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }
        @keyframes heroLine {
          0% { width: 0%; opacity: 0; }
          100% { width: 100%; opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-float { animation: heroFloat 8s ease-in-out infinite; }
        .hero-glow { animation: heroGlow 5s ease-in-out infinite; }
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="EXTRAITY Premium Extrait de Parfum"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Rich Dark Overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.82) 0%, rgba(8,8,8,0.7) 40%, rgba(8,8,8,0.85) 100%)' }} />

      {/* Golden Glow Behind Content */}
      <div
        className="hero-glow absolute pointer-events-none rounded-full"
        style={{
          width: '50vw',
          height: '50vw',
          maxWidth: '500px',
          maxHeight: '500px',
          background: 'radial-gradient(circle, rgba(196,164,74,0.08), transparent 70%)',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full flex flex-col items-center justify-center h-full" style={{ paddingBottom: '6vh' }}>
        {/* Small Label */}
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <span
            className="text-xs tracking-[0.35em] uppercase inline-block px-4 py-1.5 rounded-full mb-6"
            style={{ color: '#C4A44A', border: '1px solid rgba(196,164,74,0.25)', background: 'rgba(196,164,74,0.05)' }}
          >
            European Luxury Fragrance House
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="serif text-white leading-none italic transition-all duration-1000 ease-out font-semibold"
          style={{
            fontSize: 'clamp(44px, 8vw, 120px)',
            lineHeight: 0.85,
            letterSpacing: '-0.015em',
            marginBottom: '0.05em',
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'translateY(0)' : 'translateY(28px)',
          }}
        >
          30% EXTRAIT
        </h1>

        {/* Subheadline */}
        <p
          className="text-white/60 text-sm md:text-base max-w-lg mx-auto transition-all duration-1000 ease-out leading-relaxed"
          style={{
            marginBottom: '1.6em',
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateY(0)' : 'translateY(20px)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
          }}
        >
          Perfumes crafted for lasting performance, inspired by iconic luxury fragrances, made for those who demand more.
        </p>

        {/* CTA Button */}
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <Link
            to="/shop"
            className="serif px-10 py-4 rounded-full text-white italic tracking-[0.06em] transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap inline-block font-medium"
            style={{
              background: '#8C1C28',
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              boxShadow: '0 12px 40px rgba(140,28,40,0.3)',
            }}
          >
            SHOP COLLECTION
          </Link>
        </div>

        {/* Trust Elements */}
        <div
          className="flex flex-wrap items-center justify-center gap-5 md:gap-8 mt-8 transition-all duration-1000 ease-out"
          style={{
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          {[
            { icon: 'ri-shield-check-line', label: 'Secure Checkout' },
            { icon: 'ri-truck-line', label: 'EU Shipping' },
            { icon: 'ri-vip-crown-line', label: 'Premium Quality' },
            { icon: 'ri-gift-line', label: 'Luxury Packaging' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-white/35 text-[11px] tracking-wider whitespace-nowrap">
              <i className={`${item.icon} text-xs`} style={{ color: '#C4A44A' }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}