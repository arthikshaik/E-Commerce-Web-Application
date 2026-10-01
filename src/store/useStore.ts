import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Store {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (c: string) => void;
  addProduct: (p: Product) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (p: Product) => void;
  isInWishlist: (id: string) => boolean;
}

const initialProducts: Product[] = [
  { id: '1', name: 'Leather Crossbody Bag', price: 189, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', category: 'Bags', description: 'Handcrafted premium leather crossbody bag with gold-tone hardware.', rating: 4.8 },
  { id: '2', name: 'Classic Aviator Sunglasses', price: 245, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', category: 'Accessories', description: 'Timeless aviator sunglasses with polarized lenses and metal frame.', rating: 4.6 },
  { id: '3', name: 'Minimalist Watch', price: 320, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop', category: 'Watches', description: 'Swiss-made minimalist watch with sapphire crystal and leather strap.', rating: 4.9 },
  { id: '4', name: 'Cashmere Scarf', price: 135, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop', category: 'Accessories', description: 'Ultra-soft 100% cashmere scarf in a versatile neutral tone.', rating: 4.7 },
  { id: '5', name: 'Leather Wallet', price: 95, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop', category: 'Accessories', description: 'Slim bi-fold wallet crafted from full-grain Italian leather.', rating: 4.5 },
  { id: '6', name: 'Canvas Tote Bag', price: 78, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop', category: 'Bags', description: 'Durable organic canvas tote with reinforced leather handles.', rating: 4.4 },
  { id: '7', name: 'Gold Chain Necklace', price: 275, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop', category: 'Jewelry', description: '18K gold-plated chain necklace with adjustable length.', rating: 4.8 },
  { id: '8', name: 'Silk Pocket Square', price: 45, image: 'https://images.unsplash.com/photo-1589756823695-278bc923a84d?w=400&h=400&fit=crop', category: 'Accessories', description: 'Hand-rolled silk pocket square with artisan patterns.', rating: 4.3 },
];

export const useStore = create<Store>((set, get) => ({
  products: initialProducts,
  cart: [],
  wishlist: [],
  searchQuery: '',
  selectedCategory: 'All',
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedCategory: (c) => set({ selectedCategory: c }),
  addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
  updateProduct: (id, updates) => set((s) => ({ products: s.products.map((p) => p.id === id ? { ...p, ...updates } : p) })),
  deleteProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id), cart: s.cart.filter((c) => c.product.id !== id), wishlist: s.wishlist.filter((w) => w.id !== id) })),
  addToCart: (p) => set((s) => {
    const existing = s.cart.find((c) => c.product.id === p.id);
    if (existing) return { cart: s.cart.map((c) => c.product.id === p.id ? { ...c, quantity: c.quantity + 1 } : c) };
    return { cart: [...s.cart, { product: p, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((c) => c.product.id !== id) })),
  updateCartQuantity: (id, qty) => set((s) => {
    if (qty <= 0) return { cart: s.cart.filter((c) => c.product.id !== id) };
    return { cart: s.cart.map((c) => c.product.id === id ? { ...c, quantity: qty } : c) };
  }),
  clearCart: () => set({ cart: [] }),
  toggleWishlist: (p) => set((s) => {
    const exists = s.wishlist.find((w) => w.id === p.id);
    if (exists) return { wishlist: s.wishlist.filter((w) => w.id !== p.id) };
    return { wishlist: [...s.wishlist, p] };
  }),
  isInWishlist: (id) => get().wishlist.some((w) => w.id === id),
}));
