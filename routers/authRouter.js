import express from 'express'
import { comparePassword, hashPassword } from '../helpers/bcrypt.helper.js'
import { createUser, getUserByUsername } from '../models/User/User.model.js'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'

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

authRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await getUserByUsername(username)
    if (user?._id) {
      // check if password is valid

      const isPasswordMatch = comparePassword(password, user.password)

      if (isPasswordMatch) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
        )

        const { password, isAdmin, ...otherDetails } = user._doc
        return res
          .cookie('access_token', token, {
            httpOnly: true, //it doesn't allow any client secret to reach this cookie
          })
          .status(200)
          .json({
            status: 'success',
            message: 'Login successful',
            ...otherDetails,
          })
      } else {
        return next(createError(400, 'Wrong password or username'))
      }
    }
    return next(createError(404, 'User not found!'))
  } catch (error) {
    next(error)
  }
})

export default authRouter
