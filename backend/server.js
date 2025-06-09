import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { obtenerDB } from './bd/config.js'

import inventarioRoutes from './routes/inventarioRoutes.js'
import usuariosRoutes from './routes/usuariosRoutes.js'
import carritoRoutes from './routes/carritoRoutes.js'
import authRoutes from './routes/authRoutes.js'


const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Rutas API
app.use('/api', inventarioRoutes)
app.use('/api', usuariosRoutes)
app.use('/api', carritoRoutes)
app.use('/api/auth', authRoutes)


// Conexión a la base de datos
obtenerDB()

app.listen(PORT, () => {
  console.log(`✨ Server is running on http://localhost:${PORT}`)
})
export default app
