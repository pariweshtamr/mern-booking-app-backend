import express from 'express'
import { hashPassword } from '../helpers/bcrypt.helper.js'
import { createUser } from '../models/User/User.model.js'

const authRouter = express.Router()

authRouter.all('/', (req, res, next) => {
  next()
})

authRouter.get('/', (req, res, next) => {
  res.send('This is auth endpoint')
})

// Register

authRouter.post('/register', async (req, res, next) => {
  try {
    // encrypt password
    const hashPass = hashPassword(req.body.password)

    if (hashPass) {
      req.body.password = hashPass
      const user = await createUser(req.body)

      return res.json({
        status: 'success',
        message: 'New user has been successfully created.',
        user,
      })
    }
    res.json({
      status: 'error',
      message: 'Unable to create new user. Please try again later',
    })
  } catch (error) {
    next(error)
  }
})

export default authRouter
