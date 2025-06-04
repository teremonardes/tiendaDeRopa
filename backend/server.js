import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { obtenerDB } from './bd/config.js'

import inventarioRoutes from './routes/inventarioRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.use('/api', inventarioRoutes)

obtenerDB()

app.listen(PORT, console.log(`✨ Server is running on http://localhost:${PORT}`))
