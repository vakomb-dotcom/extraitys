import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const families = [
  {
    name: 'Fresh',
    description: 'Citrus, aquatic, green — bright, clean, and uplifting scents that feel like a breath of fresh air.',
    color: '#2A6F7A',
    bg: '#E8F0F2',
    img: 'https://readdy.ai/api/search-image?query=elegant%20minimal%20composition%20with%20fresh%20citrus%20fruits%20sliced%20lemon%20bergamot%20and%20green%20mint%20leaves%20on%20white%20marble%20surface%2C%20bright%20clean%20natural%20light%2C%20luxurious%20fresh%20fragrance%20aesthetic%2C%20ivory%20and%20pale%20green%20tones%2C%20sophisticated%20editorial%20product%20photography%2C%20premium%20perfume%20brand%20visual&width=600&height=400&seq=fam-fresh-v1&orientation=landscape',
  },
  {
    name: 'Floral',
    description: 'Rose, jasmine, iris — romantic, elegant, and timeless bouquets that bloom with feminine sophistication.',
    color: '#8C1C28',
    bg: '#F5EBED',
    img: 'https://readdy.ai/api/search-image?query=luxurious%20bouquet%20of%20soft%20pink%20roses%20white%20jasmine%20and%20iris%20petals%20arranged%20elegantly%20on%20cream%20silk%20fabric%2C%20soft%20diffused%20golden%20light%2C%20romantic%20feminine%20fragrance%20aesthetic%2C%20pastel%20pink%20and%20ivory%20tones%2C%20sophisticated%20editorial%20product%20photography%2C%20premium%20perfume%20brand%20visual&width=600&height=400&seq=fam-floral-v1&orientation=landscape',
  },
  {
    name: 'Woody',
    description: 'Sandalwood, cedar, vetiver — warm, grounded, and sophisticated scents with natural depth and elegance.',
    color: '#4A3C2E',
    bg: '#EDE8E2',
    img: 'https://readdy.ai/api/search-image?query=rich%20sandalwood%20slices%20cedar%20bark%20and%20vetiver%20roots%20arranged%20on%20dark%20warm%20wooden%20surface%2C%20warm%20amber%20natural%20light%2C%20sophisticated%20woody%20fragrance%20aesthetic%2C%20deep%20brown%20and%20warm%20tan%20tones%2C%20elegant%20editorial%20product%20photography%2C%20premium%20perfume%20brand%20visual&width=600&height=400&seq=fam-woody-v1&orientation=landscape',
  },
  {
    name: 'Oriental',
    description: 'Amber, spices, incense — opulent, mysterious, and intoxicating scents with rich, warm complexity.',
    color: '#C4A44A',
    bg: '#F5F0E6',
    img: 'https://readdy.ai/api/search-image?query=golden%20amber%20resin%20pieces%20cinnamon%20sticks%20star%20anise%20and%20frankincense%20on%20dark%20obsidian%20surface%20with%20warm%20candlelight%20glow%2C%20opulent%20oriental%20fragrance%20aesthetic%2C%20rich%20gold%20and%20deep%20amber%20tones%2C%20luxurious%20editorial%20product%20photography%2C%20premium%20perfume%20brand%20visual&width=600&height=400&seq=fam-oriental-v1&orientation=landscape',
  },
  {
    name: 'Gourmand',
    description: 'Vanilla, caramel, coffee — delicious, comforting, and addictive scents that satisfy the senses.',
    color: '#7A3B2E',
    bg: '#F0E8E4',
    img: 'https://readdy.ai/api/search-image?query=madagascar%20vanilla%20beans%20dark%20caramel%20drizzle%20and%20roasted%20coffee%20beans%20artfully%20arranged%20on%20warm%20cream%20marble%2C%20soft%20natural%20light%2C%20indulgent%20gourmand%20fragrance%20aesthetic%2C%20warm%20brown%20and%20cream%20tones%2C%20sophisticated%20editorial%20product%20photography%2C%20premium%20perfume%20brand%20visual&width=600&height=400&seq=fam-gourmand-v1&orientation=landscape',
  },
  {
    name: 'Leather',
    description: 'Leather, tobacco, birch — bold, confident, and refined scents with a distinguished character.',
    color: '#3A2E28',
    bg: '#E8E4E0',
    img: 'https://readdy.ai/api/search-image?query=premium%20dark%20leather%20strips%20and%20dried%20tobacco%20leaves%20artfully%20arranged%20on%20aged%20oak%20wood%20surface%20with%20shadow%20play%2C%20refined%20leather%20fragrance%20aesthetic%2C%20deep%20brown%20and%20charcoal%20tones%2C%20sophisticated%20editorial%20product%20photography%2C%20premium%20perfume%20brand%20visual&width=600&height=400&seq=fam-leather-v1&orientation=landscape',
  },
];

export default function FragranceFamilies() {
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
    <section ref={ref} className="w-full py-12 md:py-16" style={{ background: '#F8F5F0' }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className={`flex flex-col items-center text-center mb-8 md:mb-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[#8C1C28]/40 text-[11px] tracking-[0.4em] uppercase mb-3 font-medium">Discover By</p>
          <h2 className="serif text-[#080808] italic leading-none font-semibold mb-2" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            FRAGRANCE <span style={{ color: '#8C1C28' }}>FAMILIES</span>
          </h2>
          <p className="text-[#080808]/35 text-sm max-w-lg">Explore our collections through the language of scent. Find the family that speaks to your soul.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {families.map((f, i) => (
            <Link
              key={f.name}
              to={`/shop?family=${f.name}`}
              className={`group rounded-xl overflow-hidden cursor-pointer block transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{
                background: f.bg,
                transitionDelay: `${200 + i * 100}ms`,
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <div className="relative w-full overflow-hidden" style={{ height: '180px' }}>
                <img
                  src={f.img}
                  alt={`${f.name} fragrance family`}
                  className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${f.bg} 0%, transparent 60%)` }} />
              </div>
              <div className="px-5 pb-5 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: f.color }} />
                  <h3 className="serif text-[#080808] text-xl italic font-semibold tracking-[-0.01em]">{f.name}</h3>
                </div>
                <p className="text-[#080808]/45 text-xs leading-relaxed">{f.description}</p>
                <div className="flex items-center gap-1.5 mt-3 text-[11px] font-medium" style={{ color: f.color }}>
                  <span>Explore {f.name}</span>
                  <i className="ri-arrow-right-line text-xs" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}