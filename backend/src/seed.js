// fills the db with sample leagues, teams and matches
// run: npm run seed   (deletes old leagues / teams / matches first, users are kept)
import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import League from './models/League.js'
import Team from './models/Team.js'
import Match from './models/Match.js'
import { leagues, teams, matches } from './data/seed-data.js'

const withId = (list) => list.map(({ id, ...rest }) => ({ _id: id, ...rest }))

try {
  await connectDB()
  await Promise.all([League.deleteMany(), Team.deleteMany(), Match.deleteMany()])
  await League.insertMany(withId(leagues))
  await Team.insertMany(withId(teams))
  await Match.insertMany(withId(matches))
  console.log(`seeded ${leagues.length} leagues, ${teams.length} teams, ${matches.length} matches`)
} catch (err) {
  console.error('seed failed:', err.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
