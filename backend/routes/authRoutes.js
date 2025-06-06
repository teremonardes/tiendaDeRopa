import { Router } from 'express'
import { loginUser, postRegistro } from '../src/controllers/authControllers.js'

const router = Router()

// Login de usuario
router.post('/users/login', loginUser)

// Registro de usuario
router.post('/users/register', postRegistro)

export default router
