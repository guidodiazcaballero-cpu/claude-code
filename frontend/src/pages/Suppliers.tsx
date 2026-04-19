import { useEffect, useState } from 'react';
import { api } from '../api';
import { Supplier } from '../types';
import Modal from '../components/Modal';

const emptyForm = { name: '', contact: '', phone: '', email: '', address: '' };

export default function Suppliers() {
  const [items, setItems] = useState<Supplier[]>([]);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [selected, setSelected] = useState<Supplier | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const load = () => api.suppliers.list().then(d => setItems(d as Supplier[]));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setError(''); setModal('create'); };
  const openEdit = (s: Supplier) => {
    setSelected(s);
    setForm({ name: s.name, contact: s.contact ?? '', phone: s.phone ?? '', email: s.email ?? '', address: s.address ?? '' });
    setError(''); setModal('edit');
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    try {
      if (modal === 'create') await api.suppliers.create(form);
      else if (selected) await api.suppliers.update(selected.id, form);
      setModal(null); load();
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Error'); }
  };

  const remove = async (id: number) => {
    if (!confirm('¿Eliminar este proveedor?')) return;
    await api.suppliers.delete(id).catch(e => alert(e.message));
    load();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Proveedores</h2>
        <button onClick={openCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
          + Nuevo proveedor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Contacto</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 text-gray-500">{s.contact ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500">{s.phone ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500">{s.email ?? '—'}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(s)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => remove(s.id)} className="text-red-500 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Sin proveedores</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal title={modal === 'create' ? 'Nuevo proveedor' : 'Editar proveedor'} onClose={() => setModal(null)}>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="space-y-3">
            {(['name', 'contact', 'phone', 'email', 'address'] as const).map(k => (
              <div key={k}>
                <label className="block text-sm font-medium mb-1 capitalize">
                  {k === 'name' ? 'Nombre *' : k === 'contact' ? 'Contacto' : k === 'phone' ? 'Teléfono' : k === 'email' ? 'Email' : 'Dirección'}
                </label>
                <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form[k]} onChange={set(k)} />
              </div>
            ))}
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
