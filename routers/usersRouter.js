import express from "express"
import { verifyAdmin } from "../middlewares/auth.middleware.js"
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../models/User/User.model.js"

const userRouter = express.Router()

userRouter.all("/", (req, res, next) => {
  next()
})

// check authentication
userRouter.get("/checkauthentication", (req, res, next) => {
  res.send("hello user, You are logged in")
})

//UPDATE
userRouter.put("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const user = await updateUser(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

//DELETE
userRouter.delete("/:id", verifyAdmin, async (req, res, next) => {
  try {
    await deleteUser(req.params.id)
    res.status(200).json("User has been removed.")
  } catch (error) {
    next(error)
  }
})

//GET A user
userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await getUser(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

//GET ALL users
userRouter.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})
export default userRouter
