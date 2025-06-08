import express from 'express'
import { registrarUsuario, loginUsuario, getUserProfile, deleteUsuario } from '../src/controllers/usuariosControllers.js'
import { authMiddleware } from '../src/middlewares/tokenMiddlewares.js'
import { validarRegistro } from '../src/middlewares/usersMiddlewares.js'

const router = express.Router()

router.post('/users/register', validarRegistro, registrarUsuario)
router.post('/users/login', loginUsuario)
router.get('/users/profile', authMiddleware, getUserProfile)
router.delete('/users/delete/:id', authMiddleware, deleteUsuario)

export default router
