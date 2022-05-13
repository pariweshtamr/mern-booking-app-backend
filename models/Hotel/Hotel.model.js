import Hotel from './Hotel.schema.js'

// Add Hotel

export const addHotel = (newHotel) => {
  try {
    const hotel = Hotel(newHotel).save()
    return hotel
  } catch (error) {
    console.log(error)
  }
}
