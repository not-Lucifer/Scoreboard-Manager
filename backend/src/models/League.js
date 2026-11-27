import mongoose from 'mongoose'
import { numericId } from './plugin.js'

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  sport: { type: String, enum: ['football', 'cricket'], required: true },
})
leagueSchema.plugin(numericId)

export default mongoose.model('League', leagueSchema)
