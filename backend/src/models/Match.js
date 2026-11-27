import mongoose from 'mongoose'
import { numericId } from './plugin.js'

const { Mixed } = mongoose.Schema.Types

// football event: { id, minute, type, teamId, player, playerIn? }
// cricket ball:   { innings, over, batter, bowler, runs, extra, wicket, how, out, prev, endedMatch? }
// scoreA / scoreB: Number (football goals) or { runs, wickets, balls } (cricket)
const matchSchema = new mongoose.Schema(
  {
    sport: { type: String, enum: ['football', 'cricket'], required: true },
    leagueId: { type: Number, ref: 'League', required: true },
    teamA: { type: Number, ref: 'Team', required: true },
    teamB: { type: Number, ref: 'Team', required: true },
    scoreA: { type: Mixed, default: 0 },
    scoreB: { type: Mixed, default: 0 },
    status: { type: String, enum: ['upcoming', 'live', 'finished'], default: 'upcoming' },
    date: { type: String, default: '' },

    // football
    events: { type: [Mixed], default: undefined },

    // cricket
    format: String,
    overs: Number,
    battingFirst: Number,
    innings: Number,
    striker: String,
    nonStriker: String,
    bowler: String,
    lastBowler: String,
    freeHit: Boolean,
    log: { type: [Mixed], default: undefined },
  },
  { minimize: false },
)
matchSchema.plugin(numericId)

export default mongoose.model('Match', matchSchema)
