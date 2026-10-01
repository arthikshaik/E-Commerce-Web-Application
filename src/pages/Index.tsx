import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, Shield } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/store/useStore';

const Index = () => {
  const { products } = useStore();
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <img src={heroBanner} alt="Luxury collection" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative container h-full flex items-center">
          <div className="max-w-lg animate-fade-in">
            <p className="text-primary font-medium tracking-widest text-sm mb-3">NEW COLLECTION 2026</p>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-4">
              Discover <span className="gold-text">Luxury</span> Redefined
            </h1>
            <p className="text-muted-foreground text-lg mb-8">Curated premium accessories crafted with exceptional materials and timeless design.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 gold-gradient px-8 py-3.5 rounded-lg font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border/50 bg-secondary/30">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
            { icon: Shield, title: 'Secure Payment', desc: '100% protected checkout' },
            { icon: Sparkles, title: 'Premium Quality', desc: 'Handcrafted excellence' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 py-6 px-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest mb-2">FEATURED</p>
            <h2 className="text-3xl font-display font-bold">Best Sellers</h2>
          </div>
          <Link to="/shop" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
