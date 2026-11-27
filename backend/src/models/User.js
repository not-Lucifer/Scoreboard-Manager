import mongoose from 'mongoose'
import { numericId } from './plugin.js'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'scorer'], default: 'scorer' },
  },
  { timestamps: true },
)
userSchema.plugin(numericId)

export default mongoose.model('User', userSchema)
