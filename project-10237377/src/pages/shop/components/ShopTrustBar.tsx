import { Link } from 'react-router-dom';

export default function ShopTrustBar() {
  return (
    <section className="w-full" style={{ background: '#0D0D0D' }}>
      <div className="flex items-center justify-center gap-6 md:gap-12 px-6 py-5 overflow-x-auto no-scrollbar">
        {[
          { icon: 'ri-truck-line', text: 'Free EU Shipping Over €200' },
          { icon: 'ri-shield-check-line', text: '30-Day Returns' },
          { icon: 'ri-vip-crown-line', text: '30% Extrait Concentration' },
          { icon: 'ri-gift-line', text: 'Premium Gift Packaging' },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2 flex-shrink-0">
            <i className={`${item.icon} text-sm`} style={{ color: '#C4A44A' }} />
            <span className="text-white/50 text-xs md:text-sm whitespace-nowrap tracking-wider">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-6 md:px-12 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link
          to="/"
          className="text-xs tracking-wider text-white/30 hover:text-[#C4A44A] transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <i className="ri-arrow-left-line text-xs" />
          BACK TO HOME
        </Link>
      </div>
    </section>
  );
}