import express from "express"
import { createAccessJWT, verifyRefreshJWT } from "../helpers/jwt.helper.js"
import { getUserByUsernameAndRefreshToken } from "../models/User/User.model.js"

const tokenRouter = express.Router()

tokenRouter.get("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers

    //check if token is valid
    const { username } = verifyRefreshJWT(authorization)

    //get user info
    if (username) {
      //get user id from db by username
      const filter = {
        username,
        refreshJWT: authorization,
      }
      const user = await getUserByUsernameAndRefreshToken(filter)

      //create accessJWT and store in db
      if (user?._id) {
        const accessJWT = await createAccessJWT({ _id: user._id, username })

        //return the new accessJWT
        return res.json({
          accessJWT,
        })
      }
    }
    res.status(401).json({
      status: "error",
      message: "Unauthenticated",
    })
  } catch (error) {
    next(error)
  }
})

export default tokenRouter
