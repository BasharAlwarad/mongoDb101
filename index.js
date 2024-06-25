import './db/db.js'
import {param, query, validationResult} from 'express-validator'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// Routes
import usersRoutes from './routes/users/usersRoutes.js'

const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
dotenv.config()


app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.get('/api/v1/validator/:id', 
    [
      param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
      query('page').isInt({ min: 1 }).withMessage('Page number must be a positive integer'),
      query('size').isInt({ min: 1 }).withMessage('Size must be a positive integer')
    ], 
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { page, size } = req.query;
      const { id } = req.params;
      res.json({ message: `Fetching items for page ${page} with size ${size} and id of ${id}` });
    }
  );

app.use(`/api/v1/users`,usersRoutes)

app.listen(8000, () => {
    console.log('Server is running on port 8000')
    }
)