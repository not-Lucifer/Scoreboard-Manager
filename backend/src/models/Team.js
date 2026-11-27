import mongoose from 'mongoose'
import { numericId } from './plugin.js'

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  shortName: { type: String, default: '', trim: true },
  sport: { type: String, enum: ['football', 'cricket'], required: true },
  leagueId: { type: Number, ref: 'League', required: true },
  players: { type: [String], default: [] },
  subs: { type: [String], default: undefined }, // football only
})
teamSchema.plugin(numericId)

export default mongoose.model('Team', teamSchema)
