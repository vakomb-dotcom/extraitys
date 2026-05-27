import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import SearchModal from './SearchModal';

const mainLinks = [
  { label: 'HOME', to: '/' },
  { label: 'SHOP', to: '/shop' },
  { label: 'MEN', to: '/men' },
  { label: 'WOMEN', to: '/women' },
  { label: 'ABOUT', to: '/about' },
];

interface NavbarProps {
  alwaysTransparent?: boolean;
  opacity?: number;
  pointerEventsNone?: boolean;
}

export default function Navbar({ opacity = 1, pointerEventsNone = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { totalCount, setIsOpen } = useCart();

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pt-3.5 md:pt-3 transition-all duration-600 ${pointerEventsNone ? 'pointer-events-none' : ''}`}
        style={{ opacity }}
      >
        <nav
          className="w-full max-w-[1400px] flex items-center justify-between px-5 md:px-8 py-2.5 md:py-2 rounded-2xl pointer-events-auto transition-all duration-600"
          style={{
            background: 'rgba(8, 8, 8, 0.5)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="text-white tracking-[0.18em] hover:opacity-80 transition-opacity duration-400 whitespace-nowrap"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 600 }}
          >
            <span className="text-white">EXTRAIT</span><span style={{ color: '#8C1C28', fontWeight: 700 }}>Y</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-[11px] lg:text-xs tracking-[0.14em] transition-all duration-300 whitespace-nowrap font-medium"
                  style={{ color: isActive ? '#C4A44A' : 'rgba(255,255,255,0.7)' }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 md:gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 md:w-9 md:h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/8 cursor-pointer whitespace-nowrap"
              aria-label="Search"
            >
              <i className="ri-search-line text-white/70 text-lg md:text-base" />
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="w-10 h-10 md:w-9 md:h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/8 cursor-pointer whitespace-nowrap relative"
              aria-label="Shopping cart"
            >
              <i className="ri-shopping-bag-line text-white/70 text-lg md:text-base" />
              {totalCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: '#8C1C28' }}
                >
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer whitespace-nowrap hover:bg-white/8 rounded-full transition-colors ml-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-line'} text-white text-2xl`} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="absolute top-full mt-2 left-4 right-4 md:hidden flex flex-col rounded-2xl overflow-hidden pointer-events-auto"
            style={{
              background: 'rgba(8,8,8,0.96)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onClick={() => setMenuOpen(false)}
          >
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className="px-6 py-4 text-base font-medium tracking-[0.12em] transition-all duration-200 border-b border-white/5 last:border-b-0 whitespace-nowrap"
                  style={{ color: isActive ? '#C4A44A' : 'rgba(255,255,255,0.7)' }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}