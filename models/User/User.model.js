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
