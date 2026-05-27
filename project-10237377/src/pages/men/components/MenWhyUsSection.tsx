import { useEffect, useRef, useState } from 'react';

const stats = [
  { icon: 'ri-flask-line', value: 'Grasse', label: 'Origin', color: '#8C1C28' },
  { icon: 'ri-drop-line', value: '30%', label: 'Extrait', color: '#C4A44A' },
  { icon: 'ri-leaf-line', value: '100%', label: 'Natural', color: '#8C1C28' },
  { icon: 'ri-award-line', value: '3×', label: 'Awarded', color: '#C4A44A' },
];

export default function MenWhyUsSection() {
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
    <section ref={ref} className="w-full" style={{ background: '#0D0D0D' }}>
      <div className="px-5 md:px-12 lg:px-20 py-12 md:py-16">
        <div className={`transition-all duration-1000 mb-10 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <p className="text-[#C4A44A]/40 text-xs tracking-[0.35em] uppercase mb-2 font-medium">The Difference</p>
          <h2 className="serif text-white leading-none italic font-semibold" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
            WHY <span style={{ color: '#C4A44A' }}>EXTRAITY</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl p-6 text-center group cursor-default"
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.03)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 0.5s ease ${i * 80}ms`,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110" style={{ background: `${s.color}15` }}>
                <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
              </div>
              <p className="serif text-2xl italic mb-1" style={{ color: s.color }}>{s.value}</p>
              <p className="text-white/30 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}