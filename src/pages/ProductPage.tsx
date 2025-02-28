
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import { PRODUCTS, Product } from "../lib/types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundProduct = PRODUCTS.find(p => p.id === id) || null;
      setProduct(foundProduct);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-enzobay-neutral-200 border-t-enzobay-orange rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-enzobay-brown mb-4">Product Not Found</h2>
          <p className="text-enzobay-neutral-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <a href="/" className="btn-primary">Back to Home</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}
