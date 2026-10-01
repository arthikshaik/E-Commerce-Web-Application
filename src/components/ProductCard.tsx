import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product, useStore } from '@/store/useStore';
import { toast } from 'sonner';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group glass-card rounded-xl overflow-hidden animate-fade-in transition-all hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)]">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button
          onClick={() => { toggleWishlist(product); toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            wishlisted ? 'bg-primary text-primary-foreground' : 'bg-background/60 text-foreground hover:bg-primary hover:text-primary-foreground'
          }`}
        >
          <Heart className="h-4 w-4" fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => { addToCart(product); toast.success(`${product.name} added to cart`); }}
            className="w-full flex items-center justify-center gap-2 rounded-lg gold-gradient py-2.5 text-sm font-semibold text-primary-foreground transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-display font-semibold text-foreground leading-tight">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          <div className="flex items-center gap-1 text-primary">
            <Star className="h-3.5 w-3.5" fill="currentColor" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
