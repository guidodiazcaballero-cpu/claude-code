import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/productos', label: 'Productos', icon: '📦' },
  { to: '/movimientos', label: 'Movimientos', icon: '↕️' },
  { to: '/categorias', label: 'Categorías', icon: '🏷️' },
  { to: '/proveedores', label: 'Proveedores', icon: '🏭' },
];

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-56 bg-blue-900 text-white flex flex-col">
        <div className="p-4 border-b border-blue-700">
          <h1 className="text-lg font-bold leading-tight">🦷 Inventario<br />Dental</h1>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-blue-600 font-semibold' : 'hover:bg-blue-800'
                }`
              }
            >
              <span>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 text-xs text-blue-400 border-t border-blue-700">
          v1.0.0
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
