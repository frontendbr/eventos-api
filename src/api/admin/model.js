import mongoose, { Schema } from 'mongoose'

const Administrator = new Schema({
  email: { type: String, required: true }
})

export default mongoose.model('Administrator', Administrator)
