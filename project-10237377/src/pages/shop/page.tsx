import ShopHero from './components/ShopHero';
import ShopFeatureBanner from './components/ShopFeatureBanner';
import ShopGrid from './components/ShopGrid';
import ShopTrustBar from './components/ShopTrustBar';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

export default function ShopPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar alwaysTransparent />
      <ShopHero />
      <ShopFeatureBanner />
      <ShopGrid />
      <ShopTrustBar />
      <Footer />
    </main>
  );
}
