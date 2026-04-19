import { useEffect, useState } from 'react';
import { api } from '../api';
import { Product, Category, Supplier } from '../types';
import Modal from '../components/Modal';

const emptyForm = {
  name: '', description: '', category_id: '', supplier_id: '',
  unit: 'unidad', stock: '0', min_stock: '5', price: '', expiry_date: '',
};

export default function Products() {
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [modal, setModal] = useState<'create' | 'edit' | 'movement' | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [mvForm, setMvForm] = useState({ type: 'entrada', quantity: '1', notes: '' });
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const load = () => api.products.list().then(d => setItems(d as Product[]));
  useEffect(() => {
    load();
    api.categories.list().then(d => setCategories(d as Category[]));
    api.suppliers.list().then(d => setSuppliers(d as Supplier[]));
  }, []);

  const openCreate = () => { setForm(emptyForm); setError(''); setModal('create'); };
  const openEdit = (p: Product) => {
    setSelected(p);
    setForm({
      name: p.name, description: p.description ?? '', category_id: String(p.category_id ?? ''),
      supplier_id: String(p.supplier_id ?? ''), unit: p.unit, stock: String(p.stock),
      min_stock: String(p.min_stock), price: p.price != null ? String(p.price) : '',
      expiry_date: p.expiry_date ?? '',
    });
    setError(''); setModal('edit');
  };
  const openMovement = (p: Product) => { setSelected(p); setMvForm({ type: 'entrada', quantity: '1', notes: '' }); setError(''); setModal('movement'); };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    try {
      const payload = {
        ...form,
        category_id: form.category_id ? Number(form.category_id) : null,
        supplier_id: form.supplier_id ? Number(form.supplier_id) : null,
        stock: Number(form.stock),
        min_stock: Number(form.min_stock),
        price: form.price ? Number(form.price) : null,
        expiry_date: form.expiry_date || null,
      };
      if (modal === 'create') await api.products.create(payload);
      else if (selected) await api.products.update(selected.id, payload);
      setModal(null); load();
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Error'); }
  };

  const saveMovement = async () => {
    if (!selected) return;
    try {
      await api.movements.create({ product_id: selected.id, type: mvForm.type, quantity: Number(mvForm.quantity), notes: mvForm.notes || null });
      setModal(null); load();
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Error'); }
  };

  const remove = async (id: number) => {
    if (!confirm('¿Eliminar este producto?')) return;
    await api.products.delete(id).catch(e => alert(e.message));
    load();
  };

  const filtered = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || (p.category_name ?? '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Productos</h2>
        <div className="flex gap-3 flex-1 max-w-lg">
          <input placeholder="Buscar..." className="flex-1 border rounded-lg px-3 py-2 text-sm"
            value={search} onChange={e => setSearch(e.target.value)} />
          <button onClick={openCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium whitespace-nowrap">
            + Nuevo producto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Producto</th>
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-left">Proveedor</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-center">Mín.</th>
              <th className="px-4 py-3 text-left">Vence</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium">{p.name}</p>
                  {p.description && <p className="text-xs text-gray-400">{p.description}</p>}
                </td>
                <td className="px-4 py-3 text-gray-500">{p.category_name ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500">{p.supplier_name ?? '—'}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    p.stock === 0 ? 'bg-red-100 text-red-700' : p.stock <= p.min_stock ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {p.stock} {p.unit}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-gray-500">{p.min_stock}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{p.expiry_date ?? '—'}</td>
                <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                  <button onClick={() => openMovement(p)} className="text-green-600 hover:underline">Mover</button>
                  <button onClick={() => openEdit(p)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => remove(p.id)} className="text-red-500 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Sin productos</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {(modal === 'create' || modal === 'edit') && (
        <Modal title={modal === 'create' ? 'Nuevo producto' : 'Editar producto'} onClose={() => setModal(null)}>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.name} onChange={set('name')} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.description} onChange={set('description')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm" value={form.category_id} onChange={set('category_id')}>
                  <option value="">— Sin categoría —</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Proveedor</label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm" value={form.supplier_id} onChange={set('supplier_id')}>
                  <option value="">— Sin proveedor —</option>
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Unidad</label>
                <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.unit} onChange={set('unit')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock inicial</label>
                <input type="number" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.stock} onChange={set('stock')} disabled={modal === 'edit'} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock mínimo</label>
                <input type="number" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.min_stock} onChange={set('min_stock')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <input type="number" step="0.01" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.price} onChange={set('price')} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de vencimiento</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.expiry_date} onChange={set('expiry_date')} />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t mt-4">
            <button onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">Cancelar</button>
            <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Guardar</button>
          </div>
        </Modal>
      )}

      {modal === 'movement' && selected && (
        <Modal title={`Registrar movimiento — ${selected.name}`} onClose={() => setModal(null)}>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Stock actual: <span className="font-semibold text-gray-800">{selected.stock} {selected.unit}</span></p>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm" value={mvForm.type}
                onChange={e => setMvForm(f => ({ ...f, type: e.target.value }))}>
                <option value="entrada">Entrada (agregar stock)</option>
                <option value="salida">Salida (retirar stock)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cantidad</label>
              <input type="number" min="1" className="w-full border rounded-lg px-3 py-2 text-sm" value={mvForm.quantity}
                onChange={e => setMvForm(f => ({ ...f, quantity: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notas (opcional)</label>
              <input className="w-full border rounded-lg px-3 py-2 text-sm" value={mvForm.notes}
                onChange={e => setMvForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">Cancelar</button>
              <button onClick={saveMovement} className={`px-4 py-2 text-sm rounded-lg text-white ${mvForm.type === 'entrada' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}>
                Registrar {mvForm.type}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
