import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container py-20 text-center animate-fade-in">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-display font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="inline-flex gold-gradient px-6 py-3 rounded-lg font-semibold text-primary-foreground">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-display font-bold">Shopping Cart</h1>
        <button onClick={() => { clearCart(); toast.success('Cart cleared'); }} className="text-sm text-destructive hover:underline">
          Clear All
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="glass-card rounded-xl p-4 flex gap-4 items-center">
              <img src={product.image} alt={product.name} className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="text-primary font-bold mt-1">${product.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button onClick={() => { removeFromCart(product.id); toast.success('Removed from cart'); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-primary">Free</span></div>
            <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
              <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={() => toast.success('Order placed successfully!')} className="w-full mt-6 gold-gradient py-3 rounded-lg font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
