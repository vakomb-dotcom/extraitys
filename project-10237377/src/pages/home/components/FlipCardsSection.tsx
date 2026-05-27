import { useEffect, useRef, useState } from 'react';

interface FlipCardProps {
  icon: string;
  word: string;
  desc: string;
  color: string;
  delay: number;
  visible: boolean;
}

function FlipCard({ icon, word, desc, color, delay, visible }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${delay}ms`, perspective: '1000px', flex: '1 1 0' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: '420px',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-6 p-8"
          style={{ backfaceVisibility: 'hidden', background: '#fff' }}
        >
          <div className="w-32 h-32 flex items-center justify-center">
            <img
              src={icon}
              alt={word}
              className="w-full h-full object-contain"
              style={{ filter: `drop-shadow(0 0 20px ${color}80)` }}
            />
          </div>
          <p className="serif text-4xl italic" style={{ color }}>{word}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-4 p-8"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: color }}
        >
          <p className="text-white text-center text-lg font-medium leading-relaxed">{desc}</p>
          <div className="w-12 h-1 bg-white/40 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
}

const cards = [
  {
    icon: 'https://readdy.ai/api/search-image?query=perfume%20bottle%20minimal%20flat%20illustration%2C%20elegant%20glass%20bottle%20icon%2C%20clean%20simple%20vector%20art%2C%20fragrance%20symbol%2C%20artisan%20perfume%20on%20white%20background%2C%20gold%20accents&width=300&height=300&seq=card-artisan-1&orientation=squarish',
    word: 'ARTISAN',
    desc: 'Hand-composed in Grasse, the perfume capital of the world',
    color: '#9B2226',
  },
  {
    icon: 'https://readdy.ai/api/search-image?query=natural%20ingredient%20leaf%20illustration%20minimal%20flat%20design%2C%20botanical%20icon%2C%20clean%20simple%20vector%20art%2C%20organic%20symbol%2C%20plant%20extract%20on%20white%20background%2C%20elegant%20line%20art&width=300&height=300&seq=card-pure-1&orientation=squarish',
    word: 'PURE',
    desc: 'Only noble ingredients — no synthetics, no fillers, no compromise',
    color: '#E07A5F',
  },
  {
    icon: 'https://readdy.ai/api/search-image?query=gold%20diamond%20luxury%20illustration%20minimal%20flat%20design%2C%20precious%20gem%20icon%2C%20clean%20simple%20vector%20art%2C%20elegance%20symbol%2C%20luxury%20on%20white%20background%2C%20premium%20quality%20mark&width=300&height=300&seq=card-bold-1&orientation=squarish',
    word: 'BOLD',
    desc: 'Fragrances that make a statement — for those who dare to be remembered',
    color: '#C9A84C',
  },
  {
    icon: 'https://readdy.ai/api/search-image?query=heart%20shape%20love%20illustration%20minimal%20flat%20design%2C%20elegant%20heart%20icon%2C%20clean%20vector%20art%2C%20passion%20symbol%2C%20warmth%20on%20white%20background%2C%20sophisticated%20minimal&width=300&height=300&seq=card-elegant-1&orientation=squarish',
    word: 'ELEGANT',
    desc: 'Timeless compositions crafted with obsessive attention to every detail',
    color: '#D4C4B7',
  },
];

export default function FlipCardsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="shop" ref={ref} className="w-full min-h-screen flex flex-col" style={{ background: '#C9A84C' }}>
      <div className="px-10 pt-20 pb-12">
        <div
          className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
        >
          <p className="text-[#9B2226]/50 text-xs tracking-[0.4em] uppercase mb-3">Why choose us</p>
          <h2 className="serif text-[#9B2226] leading-none italic font-semibold" style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}>
            WHY US
          </h2>
        </div>
      </div>

      <div className="flex-1 flex gap-6 px-10 pb-20" style={{ minHeight: '420px' }}>
        {cards.map((card, i) => (
          <FlipCard
            key={card.word}
            {...card}
            delay={i * 120}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
}