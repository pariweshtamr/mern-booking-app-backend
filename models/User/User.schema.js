import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      requiired: true,
    },
    city: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refreshJWT: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", UserSchema)
export default User
