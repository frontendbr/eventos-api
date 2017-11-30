import mongoose, { Schema } from 'mongoose'

const administratorSchema = new Schema({
  email: { type: String, required: true }
})

export default mongoose.model('Administrator', administratorSchema)
export { administratorSchema }
