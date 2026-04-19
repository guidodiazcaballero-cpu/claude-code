import express from 'express';
import cors from 'cors';
import categoriesRouter from './routes/categories';
import suppliersRouter from './routes/suppliers';
import productsRouter from './routes/products';
import movementsRouter from './routes/movements';
import dashboardRouter from './routes/dashboard';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/categories', categoriesRouter);
app.use('/api/suppliers', suppliersRouter);
app.use('/api/products', productsRouter);
app.use('/api/movements', movementsRouter);
app.use('/api/dashboard', dashboardRouter);

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
