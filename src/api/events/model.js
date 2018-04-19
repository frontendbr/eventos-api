import mongoose, { Schema } from 'mongoose'

const Event = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    day: {
      type: Number,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    locationUrl: {
      type: String
    }
  },
  status: {
    type: String
  },
  link: {
    type: String
  },
  shortDescription: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Event', Event)
