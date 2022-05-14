import express from 'express'
import {
  addHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updateHotel,
} from '../models/Hotel/Hotel.model.js'

const hotelsRouter = express.Router()

//ADD
hotelsRouter.post('/', async (req, res, next) => {
  try {
    const hotel = await addHotel(req.body)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
})

//UPDATE
hotelsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedhotel = await updateHotel(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json(updatedhotel)
  } catch (error) {
    next(error)
  }
})

//DELETE
hotelsRouter.delete('/:id', async (req, res, next) => {
  try {
    await deleteHotel(req.params.id)
    res.status(200).json('Hotel has been removed.')
  } catch (error) {
    next(error)
  }
})

//GET A HOTEL
hotelsRouter.get('/:id', async (req, res, next) => {
  try {
    const hotel = await getHotel(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
})

//GET ALL HOTELS
hotelsRouter.get('/', async (req, res, next) => {
  try {
    const hotels = await getAllHotel()
    res.status(200).json(hotels)
  } catch (error) {
    // res.status(500).json(error)
    next(error)
  }
})

export default hotelsRouter
