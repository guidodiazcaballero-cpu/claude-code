import { useEffect, useState } from 'react';
import { api } from '../api';
import { Category } from '../types';
import Modal from '../components/Modal';

export default function Categories() {
  const [items, setItems] = useState<Category[]>([]);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [selected, setSelected] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [error, setError] = useState('');

  const load = () => api.categories.list().then(d => setItems(d as Category[]));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm({ name: '', description: '' }); setError(''); setModal('create'); };
  const openEdit = (c: Category) => { setSelected(c); setForm({ name: c.name, description: c.description ?? '' }); setError(''); setModal('edit'); };

  const save = async () => {
    try {
      if (modal === 'create') await api.categories.create(form);
      else if (selected) await api.categories.update(selected.id, form);
      setModal(null);
      load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error');
    }
  };

  const remove = async (id: number) => {
    if (!confirm('¿Eliminar esta categoría?')) return;
    await api.categories.delete(id).catch(e => alert(e.message));
    load();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Categorías</h2>
        <button onClick={openCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
          + Nueva categoría
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Descripción</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-gray-500">{c.description ?? '—'}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(c)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => remove(c.id)} className="text-red-500 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-400">Sin categorías</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'create' ? 'Nueva categoría' : 'Editar categoría'} onClose={() => setModal(null)}>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">Cancelar</button>
              <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">Guardar</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
