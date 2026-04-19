import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(__dirname, '..', 'inventory.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    supplier_id INTEGER REFERENCES suppliers(id),
    unit TEXT NOT NULL DEFAULT 'unidad',
    stock INTEGER NOT NULL DEFAULT 0,
    min_stock INTEGER NOT NULL DEFAULT 5,
    price REAL,
    expiry_date TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES products(id),
    type TEXT NOT NULL CHECK(type IN ('entrada', 'salida')),
    quantity INTEGER NOT NULL,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// Seed default categories if empty
const count = (db.prepare('SELECT COUNT(*) as c FROM categories').get() as { c: number }).c;
if (count === 0) {
  const insert = db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)');
  const seedCats = db.transaction(() => {
    insert.run('Instrumentos', 'Instrumentos dentales reutilizables');
    insert.run('Consumibles', 'Materiales de un solo uso');
    insert.run('Medicamentos', 'Anestésicos, antibióticos y otros fármacos');
    insert.run('Equipos', 'Equipos y aparatos dentales');
    insert.run('Higiene', 'Productos de higiene y desinfección');
  });
  seedCats();
}

export default db;
