import express from "express"
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js"
import {
  createUser,
  getUserByUsername,
  removeRefreshJWT,
} from "../models/User/User.model.js"
import { createError } from "../utils/error.js"
import { getJWTs } from "../helpers/jwt.helper.js"
import { verifyAdmin } from "../middlewares/auth.middleware.js"
import { removeSession } from "../models/Session/Session.model.js"

const authRouter = express.Router()

authRouter.all("/", (req, res, next) => {
  next()
})

authRouter.get("/", (req, res, next) => {
  res.send("This is auth endpoint")
})

// Register

authRouter.post("/register", async (req, res, next) => {
  try {
    // encrypt password
    const hashPass = hashPassword(req.body.password)

    if (hashPass) {
      req.body.password = hashPass
      const user = await createUser(req.body)

      return res.json({
        status: "success",
        message: "New user has been successfully created.",
        user,
      })
    }
    res.json({
      status: "error",
      message: "Unable to create new user. Please try again later",
    })
  } catch (error) {
    next(error)
  }
})

//login
authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await getUserByUsername(username)
    if (user?._id && user?.isAdmin) {
      // check if password is valid

      const isPasswordMatch = comparePassword(password, user.password)

      if (isPasswordMatch) {
        //get JWTs and send to client

        const jwts = await getJWTs({ _id: user._id, username: user.username })
        user.password = undefined

        return res.json({
          status: "success",
          message: "Login successful",
          jwts,
          user,
        })
      } else {
        return next(createError(400, "Wrong password or username"))
      }
    }
    return next(createError(404, "User not found!"))
  } catch (error) {
    next(error)
  }
})

//logout
authRouter.post("/logout", async (req, res, next) => {
  try {
    const { accessJWT, refreshJWT } = req.body
    accessJWT && (await removeSession(accessJWT))
    refreshJWT && (await removeRefreshJWT(refreshJWT))

    res.json({
      status: "success",
      message: "Logged out successfully",
    })
  } catch (error) {
    next(error)
  }
})

export default authRouter
