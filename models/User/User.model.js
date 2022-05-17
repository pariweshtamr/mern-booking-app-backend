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

//Update user
export const updateUser = (_id, updatedUser) => {
  try {
    const user = User.findByIdAndUpdate(_id, updatedUser, { new: true })
    return user
  } catch (error) {
    next(error)
  }
}

//Delete user
export const deleteUser = (_id) => {
  try {
    const user = User.findByIdAndDelete(_id)
    return user
  } catch (error) {
    next(error)
  }
}

//Get user
export const getUser = (_id) => {
  try {
    const user = User.findById(_id)
    return user
  } catch (error) {
    console.log(error)
  }
}

//Get all users
export const getAllUsers = (_id) => {
  try {
    const user = User.find(_id)
    return user
  } catch (error) {
    console.log(error)
  }
}
