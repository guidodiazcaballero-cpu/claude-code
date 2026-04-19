import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Movements from './pages/Movements';
import Categories from './pages/Categories';
import Suppliers from './pages/Suppliers';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Products />} />
          <Route path="movimientos" element={<Movements />} />
          <Route path="categorias" element={<Categories />} />
          <Route path="proveedores" element={<Suppliers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
