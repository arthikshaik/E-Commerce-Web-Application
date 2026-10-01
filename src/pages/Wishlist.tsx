import { Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="container py-20 text-center animate-fade-in">
        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-display font-bold mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Save items you love to find them later.</p>
        <Link to="/shop" className="inline-flex gold-gradient px-6 py-3 rounded-lg font-semibold text-primary-foreground">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <h1 className="text-4xl font-display font-bold mb-2">Wishlist</h1>
      <p className="text-muted-foreground mb-8">{wishlist.length} item{wishlist.length !== 1 && 's'} saved</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
