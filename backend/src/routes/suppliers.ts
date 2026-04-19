import { Router } from 'express';
import db from '../database';

const router = Router();

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM suppliers ORDER BY name').all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { name, contact, phone, email, address } = req.body;
  if (!name) return res.status(400).json({ error: 'Nombre requerido' });
  const result = db.prepare(
    'INSERT INTO suppliers (name, contact, phone, email, address) VALUES (?, ?, ?, ?, ?)'
  ).run(name, contact ?? null, phone ?? null, email ?? null, address ?? null);
  res.status(201).json({ id: result.lastInsertRowid, name, contact, phone, email, address });
});

router.put('/:id', (req, res) => {
  const { name, contact, phone, email, address } = req.body;
  if (!name) return res.status(400).json({ error: 'Nombre requerido' });
  const result = db.prepare(
    'UPDATE suppliers SET name=?, contact=?, phone=?, email=?, address=? WHERE id=?'
  ).run(name, contact ?? null, phone ?? null, email ?? null, address ?? null, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
  res.json({ id: Number(req.params.id), name, contact, phone, email, address });
});

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM suppliers WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
  res.json({ ok: true });
});

export default router;
