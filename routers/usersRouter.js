import express from 'express'
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../models/User/User.model.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

const userRouter = express.Router()

userRouter.all('/', (req, res, next) => {
  next()
})

// check authentication
userRouter.get('/checkauthentication', verifyToken, (req, res, next) => {
  res.send('hello user, You are logged in')
})

//UPDATE
userRouter.put('/:id', verifyUser, async (req, res, next) => {
  try {
    const user = await updateUser(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

//DELETE
userRouter.delete('/:id', verifyUser, async (req, res, next) => {
  try {
    await deleteUser(req.params.id)
    res.status(200).json('User has been removed.')
  } catch (error) {
    next(error)
  }
})

//GET A user
userRouter.get('/:id', verifyUser, async (req, res, next) => {
  try {
    const user = await getUser(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

//GET ALL users
userRouter.get('/', verifyAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    // res.status(500).json(error)
    next(error)
  }
})
export default userRouter
