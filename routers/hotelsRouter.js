import express from "express"
import { verifyAdmin } from "../middlewares/auth.middleware.js"
import {
  addHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updateHotel,
} from "../models/Hotel/Hotel.model.js"
import Hotel from "../models/Hotel/Hotel.schema.js"
import Room from "../models/Room/Room.schema.js"

const hotelsRouter = express.Router()

//ADD
hotelsRouter.post("/", verifyAdmin, async (req, res, next) => {
  try {
    const hotel = await addHotel(req.body)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
})

//UPDATE
hotelsRouter.put("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const hotel = await updateHotel(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
})

//DELETE
hotelsRouter.delete("/:id", async (req, res, next) => {
  try {
    await deleteHotel(req.params.id)
    res.status(200).json("Hotel has been removed.")
  } catch (error) {
    next(error)
  }
})

//GET A HOTEL
hotelsRouter.get("/find/:id", async (req, res, next) => {
  try {
    const hotel = await getHotel(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
})

//GET ALL HOTELS
hotelsRouter.get("/", verifyAdmin, async (req, res, next) => {
  const { min, max, ...others } = req.query
  try {
    const hotels = await getAllHotel({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit)
    res.status(200).json(hotels)
  } catch (error) {
    // res.status(500).json(error)
    next(error)
  }
})

// GET HOTEL BY CITY NAME
hotelsRouter.get("/city", async (req, res, next) => {
  const cities = req.query.cities.split(",")

  try {
    // const hotels = Hotel.find({city:city}.length) // this method is too expensive
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city }) // this method is faster. It does not fetch any property and just shows the count
      })
    )
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
})

// GET HOTEL BY TYPE

hotelsRouter.get("/type", async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" })
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" })
    const resortCount = await Hotel.countDocuments({ type: "Resort" })
    const villaCount = await Hotel.countDocuments({ type: "Villa" })
    const hostelCount = await Hotel.countDocuments({ type: "Hostel" })

    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "Apartment", count: apartmentCount },
      { type: "Resort", count: resortCount },
      { type: "Villa", count: villaCount },
      { type: "Hostel", count: hostelCount },
    ])
  } catch (error) {
    next(error)
  }
})

// Get hotel Rooms

hotelsRouter.get("/room/:id", async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
})

export default hotelsRouter
