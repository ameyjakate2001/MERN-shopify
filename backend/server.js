import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('app is started...........')
})
app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () =>
  console.log(
    `listening in ${process.env.NODE_MODE} mode to port ${port}`.yellow.bold
  )
)
