import { Router } from 'express';
import db from '../database';

const router = Router();

router.get('/', (req, res) => {
  const { product_id } = req.query;
  let query = `
    SELECT m.*, p.name as product_name
    FROM movements m
    JOIN products p ON m.product_id = p.id
  `;
  const params: unknown[] = [];
  if (product_id) {
    query += ' WHERE m.product_id = ?';
    params.push(product_id);
  }
  query += ' ORDER BY m.created_at DESC LIMIT 200';
  res.json(db.prepare(query).all(...params));
});

router.post('/', (req, res) => {
  const { product_id, type, quantity, notes } = req.body;
  if (!product_id || !type || !quantity) {
    return res.status(400).json({ error: 'product_id, type y quantity son requeridos' });
  }
  if (!['entrada', 'salida'].includes(type)) {
    return res.status(400).json({ error: 'type debe ser entrada o salida' });
  }

  const product = db.prepare('SELECT stock FROM products WHERE id = ?').get(product_id) as { stock: number } | undefined;
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

  const qty = Number(quantity);
  if (type === 'salida' && product.stock < qty) {
    return res.status(400).json({ error: 'Stock insuficiente' });
  }

  const delta = type === 'entrada' ? qty : -qty;
  db.prepare('UPDATE products SET stock = stock + ? WHERE id = ?').run(delta, product_id);

  const result = db.prepare(
    'INSERT INTO movements (product_id, type, quantity, notes) VALUES (?, ?, ?, ?)'
  ).run(product_id, type, qty, notes ?? null);

  res.status(201).json({ id: result.lastInsertRowid });
});

export default router;
