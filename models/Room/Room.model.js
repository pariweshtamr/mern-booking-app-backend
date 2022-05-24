import Hotel from '../Hotel/Hotel.schema.js'
import Room from './Room.schema.js'

// add room

export const createRoom = async (newRoom) => {
  try {
    const room = Room(newRoom).save()
    return room
  } catch (error) {
    console.log(error)
  }
}

//Update room
export const updateRoom = (_id, updatedRoom) => {
  try {
    const room = Room.findByIdAndUpdate(_id, updatedRoom, { new: true })
    return room
  } catch (error) {
    console.log(error)
  }
}

//Delete hotel
export const deleteRoom = (_id) => {
  try {
    const room = Room.findByIdAndDelete(_id)
    return room
  } catch (error) {
    console.log(error)
  }
}

//Get hotel
export const getRoom = (_id) => {
  try {
    const room = Room.findById(_id)
    return room
  } catch (error) {
    console.log(error)
  }
}

//Get all hotels
export const getAllRooms = (_id) => {
  try {
    const rooms = Room.find(_id)
    return rooms
  } catch (error) {
    console.log(error)
  }
}
