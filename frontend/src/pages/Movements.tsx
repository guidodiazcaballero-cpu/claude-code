import { useEffect, useState } from 'react';
import { api } from '../api';
import { Movement } from '../types';

export default function Movements() {
  const [items, setItems] = useState<Movement[]>([]);
  const [filter, setFilter] = useState<'all' | 'entrada' | 'salida'>('all');

  useEffect(() => { api.movements.list().then(d => setItems(d as Movement[])); }, []);

  const filtered = filter === 'all' ? items : items.filter(m => m.type === filter);

  const fmt = (dt: string) => {
    const d = new Date(dt);
    return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Historial de movimientos</h2>
        <div className="flex gap-2">
          {(['all', 'entrada', 'salida'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'
              }`}>
              {f === 'all' ? 'Todos' : f === 'entrada' ? 'Entradas' : 'Salidas'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Producto</th>
              <th className="px-4 py-3 text-center">Tipo</th>
              <th className="px-4 py-3 text-center">Cantidad</th>
              <th className="px-4 py-3 text-left">Notas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{fmt(m.created_at)}</td>
                <td className="px-4 py-3 font-medium">{m.product_name}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    m.type === 'entrada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {m.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-center font-medium">
                  <span className={m.type === 'entrada' ? 'text-green-600' : 'text-red-600'}>
                    {m.type === 'entrada' ? '+' : '-'}{m.quantity}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{m.notes ?? '—'}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Sin movimientos</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
