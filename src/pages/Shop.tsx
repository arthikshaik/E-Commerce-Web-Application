import ProductCard from '@/components/ProductCard';
import { useStore } from '@/store/useStore';

const Shop = () => {
  const { products, searchQuery, selectedCategory, setSelectedCategory } = useStore();
  const categories: string[] = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="container py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-display font-bold mb-2">Shop Collection</h1>
        <p className="text-muted-foreground">Browse our curated selection of premium accessories.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === c ? 'gold-gradient text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
