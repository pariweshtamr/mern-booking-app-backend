import express from 'express'
import { addHotel, updateHotel } from '../models/Hotel/Hotel.model.js'

const hotelsRouter = express.Router()

//ADD
hotelsRouter.post('/', async (req, res) => {
  try {
    const hotel = await addHotel(req.body)
    res.status(200).json(hotel)
  } catch (error) {
    res.status(500).json(error)
  }
})

//UPDATE
hotelsRouter.put('/:id', async (req, res) => {
  try {
    const updatedhotel = await updateHotel(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json(updatedhotel)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default hotelsRouter
