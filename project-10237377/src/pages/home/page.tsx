import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductsSection';
import FragranceFamilies from './components/FragranceFamilies';
import AboutSection from './components/AboutSection';
import AllProductsSection from './components/AllProductsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar alwaysTransparent />
      <HeroSection />
      <ProductsSection />
      <FragranceFamilies />
      <AboutSection />
      <AllProductsSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}