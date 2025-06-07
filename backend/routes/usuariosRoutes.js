import express from 'express'
import { registrarUsuario, loginUsuario, getUserProfile, deleteUsuario } from '../src/controllers/usuariosControllers.js'
import { authMiddleware } from '../src/middlewares/middlewares.js'

const router = express.Router()

router.post('/users/register', registrarUsuario)
router.post('/users/login', loginUsuario)
router.get('/users/profile', authMiddleware, getUserProfile)
router.delete('/users/delete/:id', authMiddleware, deleteUsuario)

export default router
