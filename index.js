import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import client from './db/db.js'



const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
dotenv.config()


app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.listen(8000, () => {
    console.log('Server is running on port 8000')
    }
)