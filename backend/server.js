import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { obtenerDB } from './bd/config.js'

import inventarioRoutes from './routes/inventarioRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

app.use('/api', inventarioRoutes)
app.use('/api', authRoutes)

obtenerDB()

app.listen(PORT, console.log(`✨ Server is running on http://localhost:${PORT}`))
