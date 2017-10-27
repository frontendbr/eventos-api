import joi from 'joi'

const dateEvent = joi.object().keys({
  day: joi.string(),
  month: joi.string(),
  year: joi.number()
})

const dateEventRequired = joi.object().keys({
  day: joi.string().required(),
  month: joi.string().required(),
  year: joi.number().required()
})

const locationEvent = joi.object().keys({
  city: joi.string(),
  state: joi.string(),
  address: joi.string(),
  locationUrl: joi.string(),
  zipCode: joi.string()
})

const locationEventRequired = joi.object().keys({
  city: joi.string().required(),
  state: joi.string().required(),
  address: joi.string(),
  locationUrl: joi.string(),
  zipCode: joi.string()
})

const createEvent = {
  body: {
    title: joi.string().required(),
    date: dateEventRequired.required(),
    location: locationEventRequired.required(),
    shortDescription: joi.string().required(),
    price: joi.string().required(),
    link: joi.string().required(),
    image: joi.string().empty()
  }
}

const updateEvent = {
  body: {
    title: joi.string(),
    date: dateEvent,
    location: locationEvent,
    shortDescription: joi.string(),
    price: joi.string(),
    link: joi.string(),
    image: joi.string().empty()
  }
}

module.exports = {
  createEvent,
  updateEvent
}
