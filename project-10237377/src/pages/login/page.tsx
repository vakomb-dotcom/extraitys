import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="w-full min-h-screen flex flex-col" style={{ background: '#0D0806' }}>
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-3">Welcome back</p>
            <h1 className="serif text-white text-4xl md:text-5xl italic leading-none mb-4">
              SIGN <span style={{ color: '#9B2226' }}>IN</span>
            </h1>
            <p className="text-white/40 text-sm">
              Access your orders, wishlist, and exclusive offers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-white/50 text-xs tracking-widest uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  <i className={showPw ? 'ri-eye-off-line' : 'ri-eye-line'} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#9B2226] cursor-pointer" />
                <span className="text-white/40 text-xs">Remember me</span>
              </label>
              <Link to="/register" className="text-[#C9A84C] text-xs hover:underline whitespace-nowrap">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full serif text-sm tracking-wider text-white transition-all hover:scale-[1.02] whitespace-nowrap cursor-pointer italic mt-2"
              style={{ background: '#9B2226' }}
            >
              SIGN IN
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-[#C9A84C] hover:underline transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}