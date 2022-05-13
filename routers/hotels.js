import express from 'express'
import { addHotel } from '../models/Hotel/Hotel.model.js'
import Hotel from '../models/Hotel/Hotel.schema.js'

const hotelsRouter = express.Router()

//CREATE
hotelsRouter.post('/', async (req, res) => {
  try {
    const hotel = await addHotel(req.body)
    res.status(200).json(hotel)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default hotelsRouter
