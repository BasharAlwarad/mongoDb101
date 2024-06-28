// import './db/db.js'
import connectDB from './db/db.js'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// Routes
import usersRoutes from './routes/users/usersRoutes.js'
import productsRoutes from './routes/users/productsRoues.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.use(`/api/v1/users`,usersRoutes)
app.use(`/api/v1/products`,productsRoutes)

app.listen(8000, () => {
    console.log('Server is running on port 8000')
    }
)