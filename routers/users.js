import express from 'express'

const userRouter = express.Router()

userRouter.all('/', (req, res, next) => {
  next()
})

userRouter.get('/', (req, res) => {
  res.send('This is user endpoint')
})
userRouter.get('/register', (req, res) => {
  res.json('This is user register endpoint')
})

export default userRouter
