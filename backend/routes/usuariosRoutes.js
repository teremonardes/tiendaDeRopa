import express from 'express'
import { registrarUsuario, loginUsuario } from '../src/controllers/usuariosControllers.js'
import { authMiddleware } from '../src/middlewares/middlewares.js'

const router = express.Router()

// // Ver perfil autenticado
// router.get('/users/profile', authMiddleware, getProfile)

// // Eliminar usuario
// router.delete('/users/:id', deleteUsuario)

router.post('/users/register', registrarUsuario)
router.post('/users/login', loginUsuario)

export default router
