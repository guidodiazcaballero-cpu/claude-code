export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Supplier {
  id: number;
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  category_id?: number;
  category_name?: string;
  supplier_id?: number;
  supplier_name?: string;
  unit: string;
  stock: number;
  min_stock: number;
  price?: number;
  expiry_date?: string;
  created_at: string;
}

export interface Movement {
  id: number;
  product_id: number;
  product_name: string;
  type: 'entrada' | 'salida';
  quantity: number;
  notes?: string;
  created_at: string;
}

export interface DashboardData {
  totalProducts: number;
  lowStock: number;
  totalCategories: number;
  totalSuppliers: number;
  expiringSoon: Product[];
  recentMovements: Movement[];
  lowStockProducts: Product[];
}
