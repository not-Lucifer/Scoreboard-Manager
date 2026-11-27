import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
  .catch((err) => {
    console.error('db connection failed:', err.message)
    process.exit(1)
  })
