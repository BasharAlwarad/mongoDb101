import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// database connection
import connectDB from './db/db.js';

// Routes
import usersRoutes from './routes/users/usersRoutes.js';
import productsRoutes from './routes/users/productsRoutes.js';
import loggingRoutes from './routes/users/loggingRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', loggingRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/products', productsRoutes);

app.get('/*', (req, res) => {
  res.send('invalid endpoint!');
});

app.listen(8000, () => {
  console.log('Server is running on port http://localhost:8000/');
});
