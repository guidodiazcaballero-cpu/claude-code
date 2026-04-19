import { useEffect, useState } from 'react';
import { api } from '../api';
import { DashboardData } from '../types';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.dashboard().then(d => setData(d as DashboardData)).catch(e => setError(e.message));
  }, []);

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-6 text-gray-400">Cargando...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Productos" value={data.totalProducts} icon="📦" color="border-blue-500" />
        <StatCard label="Stock bajo" value={data.lowStock} icon="⚠️" color="border-yellow-500" sub="por debajo del mínimo" />
        <StatCard label="Categorías" value={data.totalCategories} icon="🏷️" color="border-green-500" />
        <StatCard label="Proveedores" value={data.totalSuppliers} icon="🏭" color="border-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold text-gray-700 mb-3">⚠️ Productos con stock bajo</h3>
          {data.lowStockProducts.length === 0 ? (
            <p className="text-sm text-gray-400">Todo el inventario está en orden.</p>
          ) : (
            <div className="space-y-2">
              {data.lowStockProducts.map(p => (
                <div key={p.id} className="flex items-center justify-between text-sm py-1 border-b last:border-0">
                  <span className="font-medium">{p.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${p.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {p.stock} {p.unit} (mín: {p.min_stock})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold text-gray-700 mb-3">🕐 Movimientos recientes</h3>
          {data.recentMovements.length === 0 ? (
            <p className="text-sm text-gray-400">Sin movimientos registrados.</p>
          ) : (
            <div className="space-y-2">
              {data.recentMovements.map(m => (
                <div key={m.id} className="flex items-center justify-between text-sm py-1 border-b last:border-0">
                  <span className="font-medium truncate max-w-[60%]">{m.product_name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${m.type === 'entrada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {m.type === 'entrada' ? '+' : '-'}{m.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {data.expiringSoon.length > 0 && (
          <div className="bg-white rounded-xl shadow p-5 lg:col-span-2">
            <h3 className="font-semibold text-gray-700 mb-3">📅 Productos por vencer (30 días)</h3>
            <div className="space-y-2">
              {data.expiringSoon.map(p => (
                <div key={p.id} className="flex items-center justify-between text-sm py-1 border-b last:border-0">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-orange-600 font-semibold">{p.expiry_date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
