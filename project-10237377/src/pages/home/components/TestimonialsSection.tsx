import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    quote: 'Extraordinary quality. I\'ve worn luxury fragrances for years, and this extrait concentration is truly remarkable. The longevity alone justifies every euro. My signature scent now.',
    name: 'Isabelle D.',
    location: 'Paris, France',
    role: 'Rose Noir',
    flag: '🇫🇷',
    photo: 'https://readdy.ai/api/search-image?query=portrait%20of%20elegant%20French%20woman%20in%20her%2030s%2C%20natural%20beauty%2C%20soft%20confident%20smile%2C%20warm%20ambient%20light%2C%20sophisticated%20minimal%20makeup%2C%20genuine%20expression%2C%20realistic%20portrait%20photography%2C%20luxury%20brand%20aesthetic&width=200&height=200&seq=review-1-v2&orientation=squarish',
    color: '#8C1C28',
  },
  {
    quote: 'Game changer. I get stopped everywhere — even my barber asked what I\'m wearing. The scent evolves beautifully throughout the day. Best fragrance purchase I\'ve ever made.',
    name: 'Marcus R.',
    location: 'Berlin, Germany',
    role: 'Oud Mystique',
    flag: '🇩🇪',
    photo: 'https://readdy.ai/api/search-image?query=portrait%20of%20stylish%20German%20man%20in%20his%2030s%2C%20confident%20calm%20expression%2C%20urban%20modern%20background%2C%20clean%20haircut%2C%20genuine%20smile%2C%20realistic%20portrait%20photography%2C%20luxury%20brand%20aesthetic&width=200&height=200&seq=review-2-v2&orientation=squarish',
    color: '#C4A44A',
  },
  {
    quote: 'The craftsmanship is extraordinary. True art in a bottle. I used to spend hundreds on designer — this is better formulated and lasts significantly longer. Absolutely exceptional value.',
    name: 'Sofia L.',
    location: 'Milan, Italy',
    role: 'Collection Privée',
    flag: '🇮🇹',
    photo: 'https://readdy.ai/api/search-image?query=portrait%20of%20beautiful%20Italian%20woman%20with%20dark%20wavy%20hair%2C%20elegant%20natural%20style%2C%20warm%20Mediterranean%20light%2C%20genuine%20warm%20expression%2C%20realistic%20portrait%20photography%2C%20luxury%20brand%20aesthetic&width=200&height=200&seq=review-3-v2&orientation=squarish',
    color: '#8C1C28',
  },
  {
    quote: 'Best blind buy I\'ve ever made. Smells like it costs ten times the price. My entire office wants to know my secret. Already ordered three more for myself and two as gifts.',
    name: 'David K.',
    location: 'Amsterdam, Netherlands',
    role: 'Cuir Noble',
    flag: '🇳🇱',
    photo: 'https://readdy.ai/api/search-image?query=portrait%20of%20Dutch%20man%20in%20his%2030s%2C%20creative%20professional%20style%2C%20modern%20office%20background%2C%20confident%20friendly%20expression%2C%20realistic%20portrait%20photography%2C%20luxury%20brand%20aesthetic&width=200&height=200&seq=review-4-v2&orientation=squarish',
    color: '#C4A44A',
  },
  {
    quote: 'My boyfriend kept borrowing mine — had to buy him his own. Now we both have signature scents from here. The unisex options are brilliant. Truly European luxury at its finest.',
    name: 'Elena M.',
    location: 'Madrid, Spain',
    role: 'Vanille Ambre',
    flag: '🇪🇸',
    photo: 'https://readdy.ai/api/search-image?query=portrait%20of%20Spanish%20woman%20with%20warm%20genuine%20smile%2C%20curly%20dark%20hair%2C%20sunny%20natural%20light%2C%20happy%20relaxed%20expression%2C%20realistic%20portrait%20photography%2C%20luxury%20brand%20aesthetic&width=200&height=200&seq=review-5-v2&orientation=squarish',
    color: '#8C1C28',
  },
];

export default function TestimonialsSection() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % testimonials.length);
      }, 4500);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [visible]);

  const t = testimonials[current];

  return (
    <section ref={ref} className="w-full py-12 md:py-16" style={{ background: '#F8F5F0' }}>
      <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-[#8C1C28]/40 text-[11px] tracking-[0.4em] uppercase mb-3 font-medium">What Our Customers Say</p>
          <h2 className="serif text-[#080808] italic leading-none mb-8 font-semibold" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
            LOVED BY <span style={{ color: '#8C1C28' }}>THOUSANDS</span>
          </h2>

          <div
            className="rounded-2xl px-5 md:px-10 py-8 md:py-10 relative"
            style={{ background: '#FCFAF7', border: '1px solid rgba(0,0,0,0.04)' }}
          >
            {/* Customer photo */}
            <div className="w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden mx-auto mb-4" style={{ border: '2px solid rgba(196,164,74,0.2)' }}>
              <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className="ri-star-fill text-xs" style={{ color: '#C4A44A' }} />
                </div>
              ))}
            </div>

            <div key={current} style={{ animation: 'fadeSlideUp 0.5s ease-out' }}>
              <p className="text-[#080808] text-sm md:text-base leading-relaxed font-light mb-5 max-w-lg mx-auto">{t.quote}</p>

              <div className="flex items-center justify-center gap-2 mb-1">
                <p className="serif text-base italic font-semibold" style={{ color: t.color }}>{t.name}</p>
                <span className="text-lg">{t.flag}</span>
              </div>
              <p className="text-[#080808]/30 text-xs tracking-wider flex items-center justify-center gap-1">
                <span>{t.location}</span>
                <span className="text-[#080808]/12">·</span>
                <span className="text-[#080808]/40">{t.role}</span>
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === current ? '22px' : '6px',
                  height: '6px',
                  background: i === current ? '#C4A44A' : 'rgba(0,0,0,0.1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}