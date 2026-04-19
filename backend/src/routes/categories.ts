import { Router } from 'express';
import db from '../database';

const router = Router();

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM categories ORDER BY name').all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Nombre requerido' });
  try {
    const result = db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)').run(name, description ?? null);
    res.status(201).json({ id: result.lastInsertRowid, name, description });
  } catch {
    res.status(409).json({ error: 'Categoría ya existe' });
  }
});

router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  if (!name) return res.status(400).json({ error: 'Nombre requerido' });
  const result = db.prepare('UPDATE categories SET name = ?, description = ? WHERE id = ?').run(name, description ?? null, id);
  if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
  res.json({ id: Number(id), name, description });
});

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM categories WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
  res.json({ ok: true });
});

export default router;
