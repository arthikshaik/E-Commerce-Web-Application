import { useState } from 'react';
import { Pencil, Trash2, Plus, X, Save } from 'lucide-react';
import { Product, useStore } from '@/store/useStore';
import { toast } from 'sonner';

const emptyProduct = { name: '', price: 0, image: '', category: '', description: '', rating: 4.5 };

const Manage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct);
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return; }
    addProduct({ ...form, id: Date.now().toString() });
    setForm(emptyProduct);
    setShowAdd(false);
    toast.success('Product added');
  };

  const handleUpdate = (id: string) => {
    updateProduct(id, form);
    setEditing(null);
    toast.success('Product updated');
  };

  const startEdit = (p: Product) => {
    setEditing(p.id);
    setForm({ name: p.name, price: p.price, image: p.image, category: p.category, description: p.description, rating: p.rating });
  };

  const Field = ({ label, value, onChange, type = 'text' }: { label: string; value: string | number; onChange: (v: string) => void; type?: string }) => (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-secondary px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );

  return (
    <div className="container py-12 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold">Manage Products</h1>
          <p className="text-muted-foreground mt-1">Add, edit, or remove products from your catalog.</p>
        </div>
        <button onClick={() => { setShowAdd(!showAdd); setForm(emptyProduct); }} className="flex items-center gap-2 gold-gradient px-4 py-2.5 rounded-lg font-semibold text-primary-foreground text-sm">
          {showAdd ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showAdd ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showAdd && (
        <div className="glass-card rounded-xl p-6 mb-8 animate-scale-in">
          <h2 className="font-display font-semibold text-lg mb-4">New Product</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: Number(v) })} type="number" />
            <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
            <Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            <Field label="Rating" value={form.rating} onChange={(v) => setForm({ ...form, rating: Number(v) })} type="number" />
            <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          </div>
          <button onClick={handleAdd} className="flex items-center gap-2 gold-gradient px-5 py-2.5 rounded-lg font-semibold text-primary-foreground text-sm">
            <Save className="h-4 w-4" /> Save Product
          </button>
        </div>
      )}

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="glass-card rounded-xl p-4">
            {editing === p.id ? (
              <div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: Number(v) })} type="number" />
                  <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
                  <Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(p.id)} className="flex items-center gap-1.5 bg-primary px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground">
                    <Save className="h-3.5 w-3.5" /> Save
                  </button>
                  <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm bg-secondary">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.category} · ${p.price}</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => startEdit(p)} className="p-2 rounded-lg hover:bg-secondary"><Pencil className="h-4 w-4 text-primary" /></button>
                  <button onClick={() => { deleteProduct(p.id); toast.success('Product deleted'); }} className="p-2 rounded-lg hover:bg-destructive/10"><Trash2 className="h-4 w-4 text-destructive" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manage;
