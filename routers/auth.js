import express from 'express'

const authRouter = express.Router()

authRouter.all('/', (req, res, next) => {
  next()
})

authRouter.get('/', (req, res) => {
  res.send('This is auth endpoint')
})
authRouter.get('/register', (req, res) => {
  res.json('This is auth register endpoint')
})

export default authRouter
