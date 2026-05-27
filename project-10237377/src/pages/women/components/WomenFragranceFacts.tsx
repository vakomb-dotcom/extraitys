import { useEffect, useRef, useState } from 'react';

const facts = [
  {
    number: '01',
    title: 'The language of flowers — understanding florals',
    body: 'Floral notes are the heart of feminine perfumery. Rose speaks of romance, jasmine whispers sensuality, iris conveys sophistication. The art is in the blend — a single flower can be sweet, spicy, or powdery depending on how it\'s extracted and what it\'s paired with.',
    color: '#C9A84C',
    img: 'https://readdy.ai/api/search-image?query=beautiful%20fresh%20rose%20petals%2C%20jasmine%20flowers%2C%20delicate%20floral%20arrangement%2C%20warm%20soft%20lighting%2C%20romantic%20mood%2C%20premium%20perfume%20ingredient%2C%20artisan%20perfumery%2C%20cream%20background%2C%20elegant%20composition&width=700&height=500&seq=women-fact-florals-1&orientation=landscape',
  },
  {
    number: '02',
    title: 'Skin chemistry — your unique scent signature',
    body: 'The exact same perfume smells different on every person. Your skin\'s pH, natural oils, and even diet affect how fragrance notes bloom. What smells powdery on one woman can turn sweet on another. The best fragrance isn\'t the most expensive — it\'s the one that feels like you.',
    color: '#9B2226',
    img: 'https://readdy.ai/api/search-image?query=elegant%20woman%20applying%20perfume%20to%20wrist%2C%20close%20up%20intimate%20moment%2C%20soft%20warm%20lighting%2C%20luxury%20lifestyle%20photography%2C%20premium%20perfume%20advertisement%2C%20feminine%20beauty%2C%20delicate%20gesture%2C%20cream%20tones&width=700&height=500&seq=women-fact-skin-1&orientation=landscape',
  },
  {
    number: '03',
    title: 'Layering — the secret to a true signature',
    body: 'The most sophisticated fragrance wardrobes are built on layering. Start with a neutral base, add a character scent, finish with an accent. EXTRAITY fragrances are designed to be layered — Jasmin Lune as your base, Rose Noir as your statement, Vanille Ambre as your warmth.',
    color: '#E07A5F',
    img: 'https://readdy.ai/api/search-image?query=multiple%20luxury%20perfume%20bottles%20arranged%20elegantly%2C%20fragrance%20layering%20concept%2C%20warm%20cream%20background%2C%20artisan%20perfumery%2C%20premium%20perfume%20collection%2C%20soft%20natural%20lighting%2C%20sophisticated%20display%2C%20golden%20accents&width=700&height=500&seq=women-fact-layering-1&orientation=landscape',
  },
];

export default function WomenFragranceFacts() {
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
    <section ref={ref} className="w-full" style={{ background: '#F5F0EB' }}>
      <div className="px-10 lg:px-20 pt-20 pb-12">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <p className="text-[#E07A5F]/50 text-xs tracking-[0.4em] uppercase mb-3">The knowledge</p>
          <h2 className="serif text-[#1A1A1A] leading-none italic font-semibold" style={{ fontSize: 'clamp(38px, 5.5vw, 80px)' }}>
            FRAGRANCE<br />
            <span style={{ color: '#E07A5F' }}>EDUCATION</span>
          </h2>
        </div>
      </div>

      <div className="px-10 lg:px-20 pb-20 flex flex-col gap-16">
        {facts.map((fact, i) => (
          <div
            key={fact.number}
            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}
            style={{
              transitionDelay: `${i * 150}ms`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'all 1s ease',
            }}
          >
            <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden" style={{ height: '360px' }}>
              <img src={fact.img} alt={fact.title} className="w-full h-full object-cover object-top" />
            </div>
            <div className="w-full lg:w-1/2">
              <p
                className="serif mb-4 select-none italic"
                style={{ fontSize: 'clamp(60px, 8vw, 100px)', color: `${fact.color}30`, lineHeight: 1 }}
              >
                {fact.number}
              </p>
              <h3 className="serif text-[#1A1A1A] text-2xl lg:text-3xl mb-4 leading-tight italic">{fact.title}</h3>
              <p className="text-[#1A1A1A]/60 text-lg leading-relaxed mb-6">{fact.body}</p>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wider"
                style={{ background: `${fact.color}30`, color: '#1A1A1A' }}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-shield-check-line text-sm" style={{ color: fact.color }} />
                </div>
                EXTRAITY standard
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}