import MenHero from './components/MenHero';
import MenLifeStagesSection from './components/MenLifeStagesSection';
import MenWhyUsSection from './components/MenWhyUsSection';
import MenCtaSection from './components/MenCtaSection';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

export default function MenPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar alwaysTransparent />
      <MenHero />
      <MenLifeStagesSection />
      <MenWhyUsSection />
      <MenCtaSection />
      <Footer />
    </main>
  );
}