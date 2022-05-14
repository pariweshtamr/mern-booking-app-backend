import User from './User.schema.js'

// Register user

export const createUser = (newUser) => {
  try {
    const user = User(newUser).save()
    return user
  } catch (error) {
    console.log(error)
  }
}

// get user by username

export const getUserByUsername = (username) => {
  try {
    const user = User.findOne({ username })
    return user
  } catch (error) {
    console.log(error)
  }
}
