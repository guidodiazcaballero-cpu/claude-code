import { Router } from 'express';
import db from '../database';

const router = Router();

const PRODUCT_SELECT = `
  SELECT p.*, c.name as category_name, s.name as supplier_name
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
  LEFT JOIN suppliers s ON p.supplier_id = s.id
`;

router.get('/', (_req, res) => {
  const rows = db.prepare(PRODUCT_SELECT + ' ORDER BY p.name').all();
  res.json(rows);
});

router.get('/low-stock', (_req, res) => {
  const rows = db.prepare(PRODUCT_SELECT + ' WHERE p.stock <= p.min_stock ORDER BY p.stock ASC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare(PRODUCT_SELECT + ' WHERE p.id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'No encontrado' });
  res.json(row);
});

router.post('/', (req, res) => {
  const { name, description, category_id, supplier_id, unit, stock, min_stock, price, expiry_date } = req.body;
  if (!name) return res.status(400).json({ error: 'Nombre requerido' });
  const result = db.prepare(`
    INSERT INTO products (name, description, category_id, supplier_id, unit, stock, min_stock, price, expiry_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name, description ?? null, category_id ?? null, supplier_id ?? null,
    unit ?? 'unidad', stock ?? 0, min_stock ?? 5, price ?? null, expiry_date ?? null
  );

  if ((stock ?? 0) > 0) {
    db.prepare('INSERT INTO movements (product_id, type, quantity, notes) VALUES (?, ?, ?, ?)')
      .run(result.lastInsertRowid, 'entrada', stock ?? 0, 'Stock inicial');
  }

  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', (req, res) => {
  const { name, description, category_id, supplier_id, unit, min_stock, price, expiry_date } = req.body;
  if (!name) return res.status(400).json({ error: 'Nombre requerido' });
  const result = db.prepare(`
    UPDATE products SET name=?, description=?, category_id=?, supplier_id=?, unit=?, min_stock=?, price=?, expiry_date=?
    WHERE id=?
  `).run(
    name, description ?? null, category_id ?? null, supplier_id ?? null,
    unit ?? 'unidad', min_stock ?? 5, price ?? null, expiry_date ?? null,
    req.params.id
  );
  if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
  res.json({ id: Number(req.params.id) });
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM movements WHERE product_id = ?').run(req.params.id);
  const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
  res.json({ ok: true });
});

export default router;
