import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CtaSection() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="w-full py-12 md:py-16 flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1012 50%, #0D0D0D 100%)' }}
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px]" style={{ background: '#C4A44A' }} />

      <div
        className={`relative z-10 text-center px-6 max-w-lg transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <p className="text-[#C4A44A]/40 text-[11px] tracking-[0.4em] uppercase mb-4 font-medium">Join the Circle</p>
        <h2 className="serif text-white italic leading-none mb-2 font-semibold" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>
          EARLY <span style={{ color: '#C4A44A' }}>ACCESS</span>
        </h2>
        <p className="text-white/40 text-sm mb-7 leading-relaxed">Be the first to discover new fragrances, receive exclusive offers, and enjoy 10% off your first order.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} data-readdy-form action="https://readdy.ai/api/form/d8bd8memplddqrtjo0t0" method="POST" className="flex items-center gap-0 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-l-full outline-none text-white placeholder-white/20 text-sm py-3.5 px-5 transition-all duration-300 focus:bg-white/8 focus:border-[#C4A44A]/30"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-r-full text-sm font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer tracking-wider"
              style={{ background: '#C4A44A', color: '#080808' }}
            >
              GET 10% OFF
            </button>
          </form>
        ) : (
          <div className="transition-all duration-500">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(196,164,74,0.12)' }}>
              <i className="ri-check-line text-2xl" style={{ color: '#C4A44A' }} />
            </div>
            <p className="text-white text-lg font-medium">Welcome to the circle.</p>
            <p className="text-white/30 text-sm mt-1">Your 10% off code has been sent to your inbox.</p>
          </div>
        )}
      </div>
    </section>
  );
}