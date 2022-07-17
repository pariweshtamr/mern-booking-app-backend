import { verifyAccessJWT } from "../helpers/jwt.helper.js"
import { getSession } from "../models/Session/Session.model.js"
import { getUserById } from "../models/User/User.model.js"

export const verifyAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    console.log(authorization, "asdasd")

    if (authorization) {
      //validate accessJWT
      const decoded = verifyAccessJWT(authorization)

      console.log(decoded)

      if (decoded === "jwt expired") {
        return res.status(403).json({
          status: "error",
          message: "jwt expired",
        })
      }

      const session = decoded?.username
        ? await getSession({ token: authorization })
        : null

      if (session?._id) {
        const user = await getUserById(session.userId)
        if (user?.isAdmin) {
          req.user = user

          next()
          return
        }
      }
    }
    return res.status(401).json({
      status: "error",
      message: "Unauthenticated. Please log in again.",
    })
  } catch (error) {
    next(error)
  }
}
