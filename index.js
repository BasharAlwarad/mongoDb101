// import './db/db.js'
import connectDB from './db/db.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import bcrypt from 'bcryptjs';

// Routes
import usersRoutes from './routes/users/usersRoutes.js';
import productsRoutes from './routes/users/productsRoues.js';

// Models
import User from './models/usersModel.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to `true` in production with HTTPS
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/v1/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = {
        id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
      };
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Define the /api/v1/logout route
app.post('/api/v1/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

app.use(`/api/v1/users`, isAuthenticated, usersRoutes);
app.use(`/api/v1/products`, productsRoutes);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
