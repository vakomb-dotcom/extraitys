import { useEffect, useRef, useState } from 'react';

const chapters = [
  {
    year: '2019',
    title: 'The Frustration',
    body: 'Our founder, Lukas Brandt, spent years traveling Europe sampling luxury perfumes — and grew tired of paying designer prices for scents that faded within hours. He discovered the secret: concentration. Most perfumes sit at 8-12%. He wanted 30%. He couldn\'t find it. So he decided to create it.',
    color: '#9B2226',
    img: 'https://readdy.ai/api/search-image?query=european%20perfume%20boutique%20interior%2C%20elegant%20glass%20display%20shelves%2C%20warm%20amber%20lighting%2C%20luxury%20fragrance%20shop%2C%20sophisticated%20atmosphere%2C%20professional%20photography%2C%20rich%20dark%20tones%2C%20premium%20retail%20space%2C%20artisan%20perfume%20brand&width=700&height=500&seq=extraity-story-boutique-1&orientation=landscape',
  },
  {
    year: '2021',
    title: 'The Formula',
    body: 'After two years of collaboration with master perfumers in Grasse, France — the perfume capital of the world — Extraity\'s first 30% extrait formula was born. A concentration three times more potent than standard eau de parfum. Maximum longevity. Maximum projection. Zero compromise.',
    color: '#C9A84C',
    img: 'https://readdy.ai/api/search-image?query=traditional%20perfumery%20laboratory%20Grasse%20France%2C%20glass%20bottles%20with%20essential%20oils%2C%20vintage%20perfume%20organ%2C%20warm%20amber%20lighting%2C%20artisan%20craft%2C%20dark%20wood%20surfaces%2C%20professional%20photography%2C%20rich%20textures%2C%20mysterious%20atmosphere&width=700&height=500&seq=extraity-story-lab-1&orientation=landscape',
  },
  {
    year: '2025',
    title: 'Europe-Wide',
    body: 'What started in a small Grasse workshop now reaches fragrance lovers in 27 European countries. Fast shipping, uncompromising quality, and a growing collection of pure 30% extrait fragrances. This is just the beginning of the Extraity revolution.',
    color: '#E07A5F',
    img: 'https://readdy.ai/api/search-image?query=luxury%20perfume%20bottles%20on%20world%20map%20surface%2C%20europe%20map%2C%20elegant%20display%2C%20dark%20sophisticated%20background%2C%20professional%20photography%2C%20global%20brand%2C%20premium%20fragrance%2C%20warm%20golden%20highlights%2C%20artisan%20bottles&width=700&height=500&seq=extraity-story-europe-1&orientation=landscape',
  },
];

export default function AboutStory() {
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
    <section ref={ref} className="w-full" style={{ background: '#151515' }}>
      <div className="px-10 lg:px-20 pt-20 pb-16">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <p className="text-[#C9A84C]/60 text-sm tracking-[0.5em] uppercase mb-4">How Extraity was born</p>
          <h2 className="serif text-white leading-none italic" style={{ fontSize: 'clamp(44px, 6vw, 90px)' }}>
            THE<br />
            <span style={{ color: '#C9A84C' }}>ORIGIN</span>
          </h2>
        </div>
      </div>

      <div className="px-10 lg:px-20 pb-20 flex flex-col gap-0">
        {chapters.map((ch, i) => (
          <div
            key={ch.year}
            className={`flex flex-col lg:flex-row items-stretch gap-0 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: `all 0.9s ease ${i * 150}ms`,
            }}
          >
            <div className="w-full lg:w-1/2 h-72 lg:h-96 overflow-hidden">
              <img
                src={ch.img}
                alt={ch.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div
              className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-16 py-12"
              style={{ background: '#1C1C1C' }}
            >
              <p className="serif mb-3 italic" style={{ color: ch.color, fontSize: '13px', letterSpacing: '0.3em' }}>
                {ch.year}
              </p>
              <h3 className="serif text-white mb-5 italic" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', lineHeight: 0.95 }}>
                {ch.title}
              </h3>
              <p className="text-white/55 text-lg leading-relaxed max-w-sm">
                {ch.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}