import { Router } from 'express'
import jwt from 'jsonwebtoken'
import db from '../bd/config.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await db.query(
      'SELECT * FROM usuario WHERE mail = $1 AND pass = $2',
      [email, password]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const user = result.rows[0]
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token, user })
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

export default router
