const BASE = '/api';

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Error de red' }));
    throw new Error(err.error ?? 'Error desconocido');
  }
  return res.json();
}

export const api = {
  dashboard: () => req('/dashboard'),

  categories: {
    list: () => req('/categories'),
    create: (data: object) => req('/categories', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: object) => req(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => req(`/categories/${id}`, { method: 'DELETE' }),
  },

  suppliers: {
    list: () => req('/suppliers'),
    create: (data: object) => req('/suppliers', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: object) => req(`/suppliers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => req(`/suppliers/${id}`, { method: 'DELETE' }),
  },

  products: {
    list: () => req('/products'),
    get: (id: number) => req(`/products/${id}`),
    create: (data: object) => req('/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: object) => req(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => req(`/products/${id}`, { method: 'DELETE' }),
  },

  movements: {
    list: (product_id?: number) => req('/movements' + (product_id ? `?product_id=${product_id}` : '')),
    create: (data: object) => req('/movements', { method: 'POST', body: JSON.stringify(data) }),
  },
};
