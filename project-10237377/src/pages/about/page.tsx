import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import AboutHero from './components/AboutHero';
import AboutStory from './components/AboutStory';
import AboutValues from './components/AboutValues';
import AboutCta from './components/AboutCta';

export default function AboutPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar alwaysTransparent />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutCta />
      <Footer />
    </main>
  );
}
