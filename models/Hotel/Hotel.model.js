import Hotel from './Hotel.schema.js'

//Add Hotel
export const addHotel = (newHotel) => {
  try {
    const hotel = Hotel(newHotel).save()
    return hotel
  } catch (error) {
    console.log(error)
  }
}

//Update hotel
export const updateHotel = (_id, updatedHotel) => {
  try {
    const hotel = Hotel.findByIdAndUpdate(_id, updatedHotel, { new: true })
    return hotel
  } catch (error) {
    console.log(error)
  }
}

//Delete hotel
export const deleteHotel = (_id) => {
  try {
    const hotel = Hotel.findByIdAndDelete(_id)
    return hotel
  } catch (error) {
    console.log(error)
  }
}

//Get hotel
export const getHotel = (_id) => {
  try {
    const hotel = Hotel.findById(_id)
    return hotel
  } catch (error) {
    console.log(error)
  }
}
