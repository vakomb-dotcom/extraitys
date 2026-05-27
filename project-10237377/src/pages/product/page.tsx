import { useParams, Navigate } from 'react-router-dom';
import { allProducts } from '@/mocks/products';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ProductHero from './components/ProductHero';
import ProductRelated from './components/ProductRelated';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <ProductHero product={product} />
      <ProductRelated product={product} />
      <Footer />
    </main>
  );
}