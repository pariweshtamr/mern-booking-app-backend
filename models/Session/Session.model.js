import Session from "./Session.schema.js"

export const storeSession = (tokenObj) => {
  return Session(tokenObj).save()
}

export const getSession = (token) => {
  return Session.findOne(token)
}

export const removeSession = (token) => {
  return Session.deleteOne({ token: token })
}
