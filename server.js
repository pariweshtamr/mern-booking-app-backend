import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import cors from 'cors'
import helmet from 'helmet'

const PORT = process.env.PORT || 8000

// Connect mongoDB
import mongoClient from './config/db.js'
mongoClient()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

// Import routers
import authRouter from './routers/auth.js'
import userRouter from './routers/users.js'
import hotelsRouter from './routers/hotels.js'

// Use Routers
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/rooms', authRouter)

app.use('/', (req, res) => {
  res.json({ message: 'Server is ready' })
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Backend server is running at ${PORT}`)
})
