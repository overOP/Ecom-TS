import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import userRoutes from './Routes/userRoutes';
import fileRoutes from './Routes/fileRoutes';
import profileRoutes from './Routes/profileRoutes';

import categoryRoutes from './Routes/categoryRoutes';
import subcategoryRoutes from './Routes/subcategoryRoutes';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Your existing routes
app.use('/users', userRoutes);
app.use('/files', fileRoutes);
app.use('/auth', profileRoutes);

app.use('/category', categoryRoutes);
app.use('/subcategory', subcategoryRoutes);

app.get('/', (_: express.Request, res: express.Response) => {
  res.json({ ok: true, message: 'API is alive 👋' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

