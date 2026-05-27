import { useEffect, useRef, useState } from 'react';

const values = [
  {
    icon: 'ri-flask-line',
    label: '30% EXTRAIT ONLY',
    desc: 'Every single Extraity fragrance is a true 30% concentration extrait. No watered-down eau de toilette. No 12% compromises. Just pure, potent, all-day performance.',
    color: '#C9A84C',
    bg: 'rgba(201,168,76,0.08)',
  },
  {
    icon: 'ri-global-line',
    label: 'ALL OF EUROPE',
    desc: 'Fast, reliable delivery to every corner of Europe. From Lisbon to Helsinki, Dublin to Athens — your extrait arrives at your door within days.',
    color: '#9B2226',
    bg: 'rgba(155,34,38,0.08)',
  },
  {
    icon: 'ri-eye-line',
    label: 'FULL TRANSPARENCY',
    desc: 'Every ingredient listed. Every concentration disclosed. No mystery "fragrance" formulas. You deserve to know exactly what you\'re wearing — and we deliver that promise.',
    color: '#E07A5F',
    bg: 'rgba(224,122,95,0.08)',
  },
];

export default function AboutValues() {
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
    <section ref={ref} className="w-full" style={{ background: '#0A0A0A' }}>
      <div className="px-10 lg:px-20 py-24">
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="text-[#C9A84C]/50 text-sm tracking-[0.5em] uppercase mb-4">What we stand for</p>
            <h2 className="serif text-white leading-none italic" style={{ fontSize: 'clamp(44px, 6vw, 90px)' }}>
              THREE<br />
              <span style={{ color: '#C9A84C' }}>PROMISES</span>
            </h2>
          </div>
          <p className="text-white/40 text-lg leading-relaxed max-w-xs lg:text-right">
            These are the principles Extraity was built on. No compromises, no shortcuts, no exceptions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: '#222' }}>
          {values.map((v, i) => (
            <div
              key={v.label}
              className="p-10 group cursor-default"
              style={{
                background: '#0A0A0A',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.8s ease ${i * 120}ms`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110"
                style={{ background: v.bg }}
              >
                <i className={`${v.icon} text-2xl`} style={{ color: v.color }} />
              </div>
              <p className="serif mb-4 italic" style={{ color: v.color, fontSize: '13px', letterSpacing: '0.3em' }}>
                {v.label}
              </p>
              <p className="text-white/50 text-lg leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <div
          className={`mt-px grid grid-cols-3 gap-px transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ background: '#222' }}
        >
          {[
            { num: '30%', label: 'Pure extrait concentration' },
            { num: '27', label: 'Countries served across Europe' },
            { num: '0', label: 'Synthetic shortcuts. Ever.' },
          ].map((s) => (
            <div key={s.label} className="px-10 py-10" style={{ background: '#0A0A0A' }}>
              <p className="serif text-white mb-2 italic" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1 }}>
                {s.num}
              </p>
              <p className="text-white/35 text-base tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}