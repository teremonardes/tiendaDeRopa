import express from 'express'
import { getProfile, deleteUsuario } from '../src/controllers/usuariosControllers.js'
import { verificarToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Ver perfil autenticado
router.get('/users/profile', verificarToken, getProfile)

// Eliminar usuario
router.delete('/users/:id', deleteUsuario)

export default router
