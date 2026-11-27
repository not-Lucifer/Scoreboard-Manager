import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db.js'

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET missing in .env')
  process.exit(1)
}

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
  .catch((err) => {
    console.error('db connection failed:', err.message)
    process.exit(1)
  })
