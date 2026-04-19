import { Router } from 'express';
import db from '../database';

const router = Router();

router.get('/', (_req, res) => {
  const totalProducts = (db.prepare('SELECT COUNT(*) as c FROM products').get() as { c: number }).c;
  const lowStock = (db.prepare('SELECT COUNT(*) as c FROM products WHERE stock <= min_stock').get() as { c: number }).c;
  const totalCategories = (db.prepare('SELECT COUNT(*) as c FROM categories').get() as { c: number }).c;
  const totalSuppliers = (db.prepare('SELECT COUNT(*) as c FROM suppliers').get() as { c: number }).c;

  const today = new Date().toISOString().split('T')[0];
  const expiringSoon = db.prepare(`
    SELECT * FROM products
    WHERE expiry_date IS NOT NULL AND expiry_date <= date('now', '+30 days') AND expiry_date >= date('now')
    ORDER BY expiry_date ASC
  `).all();

  const recentMovements = db.prepare(`
    SELECT m.*, p.name as product_name
    FROM movements m JOIN products p ON m.product_id = p.id
    ORDER BY m.created_at DESC LIMIT 10
  `).all();

  const lowStockProducts = db.prepare(`
    SELECT p.*, c.name as category_name FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.stock <= p.min_stock ORDER BY p.stock ASC LIMIT 10
  `).all();

  res.json({ totalProducts, lowStock, totalCategories, totalSuppliers, expiringSoon, recentMovements, lowStockProducts });
});

export default router;
