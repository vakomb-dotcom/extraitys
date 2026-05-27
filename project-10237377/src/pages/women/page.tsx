import WomenHero from './components/WomenHero';
import WomenLifeStagesSection from './components/WomenLifeStagesSection';
import WomenWhyUsSection from './components/WomenWhyUsSection';
import WomenCtaSection from './components/WomenCtaSection';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

export default function WomenPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar alwaysTransparent />
      <WomenHero />
      <WomenLifeStagesSection />
      <WomenWhyUsSection />
      <WomenCtaSection />
      <Footer />
    </main>
  );
}