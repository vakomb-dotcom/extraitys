import { useEffect, useRef, useState } from 'react';

const facts = [
  {
    number: '01',
    title: 'Concentration matters — EDP vs EDT',
    body: '30% Extrait concentration delivers 3x the potency of standard Eau de Parfum. That means deeper projection, significantly longer longevity (10+ hours), and richer scent evolution. Every EXTRAITY fragrance is pure 30% Extrait — because your signature scent deserves maximum performance.',
    color: '#C9A84C',
    img: 'https://readdy.ai/api/search-image?query=luxury%20perfume%20ingredients%20in%20glass%20bottles%2C%20essential%20oils%2C%20fragrance%20creation%2C%20clean%20warm%20background%2C%20artisan%20perfumery%2C%20amber%20colored%20liquids%2C%20premium%20quality%2C%20soft%20natural%20lighting%2C%20sophisticated&width=700&height=500&seq=men-fact-concentration-1&orientation=landscape',
  },
  {
    number: '02',
    title: 'The art of sillage — your invisible signature',
    body: 'Sillage (pronounced "see-yazh") is the trail a fragrance leaves behind. A great men\'s fragrance shouldn\'t announce itself from across the room — it should be discovered as you pass by. The perfect sillage is 2-3 feet: enough to intrigue, never to overwhelm.',
    color: '#9B2226',
    img: 'https://readdy.ai/api/search-image?query=elegant%20man%20walking%20through%20city%20street%2C%20sophisticated%20urban%20style%2C%20warm%20golden%20hour%20light%2C%20lifestyle%20photography%2C%20premium%20cologne%20advertisement%2C%20confident%20stride%2C%20atmospheric%2C%20luxurious&width=700&height=500&seq=men-fact-sillage-1&orientation=landscape',
  },
  {
    number: '03',
    title: 'Notes pyramid — the fragrance journey',
    body: 'Every great fragrance unfolds in three acts: Top notes (first 15 min — citrus, herbs), Heart notes (2-4 hours — florals, spices), and Base notes (4-12+ hours — woods, resins, musks). Cheap fragrances have flat pyramids. EXTRAITY compositions are built to evolve beautifully.',
    color: '#E07A5F',
    img: 'https://readdy.ai/api/search-image?query=perfume%20ingredients%20arranged%20beautifully%2C%20bergamot%20citrus%2C%20cedar%20wood%2C%20vanilla%20beans%2C%20artistic%20flat%20lay%2C%20warm%20cream%20background%2C%20artisan%20perfumery%2C%20premium%20natural%20ingredients%2C%20soft%20natural%20lighting&width=700&height=500&seq=men-fact-pyramid-1&orientation=landscape',
  },
];

export default function MenFragranceFacts() {
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
          <p className="text-[#9B2226]/50 text-xs tracking-[0.4em] uppercase mb-3">The knowledge</p>
          <h2 className="serif text-[#1A1A1A] leading-none italic font-semibold" style={{ fontSize: 'clamp(38px, 5.5vw, 80px)' }}>
            FRAGRANCE<br />
            <span style={{ color: '#9B2226' }}>EDUCATION</span>
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