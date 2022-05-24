import express from 'express'
import Hotel from '../models/Hotel/Hotel.schema.js'
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from '../models/Room/Room.model.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const roomRouter = express.Router()

roomRouter.all('/', (req, res, next) => {
  next()
})

//ADD
roomRouter.post('/:hotelid', verifyAdmin, async (req, res, next) => {
  const hotelId = req.params.hotelid
  try {
    const room = await createRoom(req.body)
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } })
    } catch (error) {
      console.log(error)
    }
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
})

//UPDATE
roomRouter.put('/:id', verifyAdmin, async (req, res, next) => {
  try {
    const room = await updateRoom(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
})

//DELETE
roomRouter.delete('/:id/:hotelid', verifyAdmin, async (req, res, next) => {
  const hotelId = req.params.hotelid
  try {
    await deleteRoom(req.params.id)
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      })
    } catch (error) {
      console.log(error)
    }
    res.status(200).json('Room has been deleted.')
  } catch (error) {
    next(error)
  }
})

//GET A HOTEL
roomRouter.get('/:id', verifyAdmin, async (req, res, next) => {
  try {
    const hotel = await getRoom(req.params.id)
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
})

//GET ALL HOTELS
roomRouter.get('/', verifyAdmin, async (req, res, next) => {
  try {
    const rooms = await getAllRooms()
    res.status(200).json(rooms)
  } catch (error) {
    // res.status(500).json(error)
    next(error)
  }
})

export default roomRouter
