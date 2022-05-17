import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 8000

// Connect mongoDB
import mongoClient from './config/db.js'
mongoClient()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(cookieParser())

// Import routers
import authRouter from './routers/authRouter.js'
import userRouter from './routers/usersRouter.js'
import hotelsRouter from './routers/hotelsRouter.js'

// Use Routers
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/rooms', authRouter)

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500
  const errorMessage = error.message || 'Something went wrong!'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  })
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Backend server is running at ${PORT}`)
})
