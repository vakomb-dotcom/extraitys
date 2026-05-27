import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full" style={{ background: '#0A0A0A' }}>
      {/* Top Section */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 gap-6">
        <div className="flex items-center gap-8 flex-wrap justify-center">
          <Link to="/shop" className="text-white/40 hover:text-[#C4A44A] text-sm tracking-wider transition-colors duration-300">Shop</Link>
          <Link to="/men" className="text-white/40 hover:text-[#C4A44A] text-sm tracking-wider transition-colors duration-300">Men</Link>
          <Link to="/women" className="text-white/40 hover:text-[#C4A44A] text-sm tracking-wider transition-colors duration-300">Women</Link>
          <Link to="/about" className="text-white/40 hover:text-[#C4A44A] text-sm tracking-wider transition-colors duration-300">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram" rel="nofollow" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer">
            <i className="ri-instagram-line text-white/40 text-base" />
          </a>
          <a href="#" aria-label="TikTok" rel="nofollow" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer">
            <i className="ri-tiktok-line text-white/40 text-base" />
          </a>
          <a href="#" aria-label="Twitter" rel="nofollow" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer">
            <i className="ri-twitter-x-line text-white/40 text-base" />
          </a>
        </div>
      </div>

      {/* Divider with gold accent */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent 0%, rgba(196,164,74,0.15) 30%, rgba(255,255,255,0.06) 50%, rgba(196,164,74,0.15) 70%, transparent 100%)' }} />
      </div>

      {/* Bottom Section */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-5 gap-3">
        <p className="serif text-white/15 text-sm italic tracking-[0.12em]">EXTRAITY</p>
        <div className="flex gap-6">
          <a href="#" rel="nofollow" className="text-white/15 hover:text-white/30 text-xs transition-colors duration-300">Privacy Policy</a>
          <a href="#" rel="nofollow" className="text-white/15 hover:text-white/30 text-xs transition-colors duration-300">Terms of Service</a>
          <a href="#" rel="nofollow" className="text-white/15 hover:text-white/30 text-xs transition-colors duration-300">Shipping Info</a>
        </div>
        <p className="text-white/10 text-xs">© 2026 EXTRAITY. All rights reserved.</p>
      </div>
    </footer>
  );
}