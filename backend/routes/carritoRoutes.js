import { Router } from 'express'

import {
  getCarritoid
} from '../src/controllers/carritoControllers.js'
import { authMiddleware } from '../src/middlewares/middlewares.js'

const router = Router()

router.get('/cart/:userid', authMiddleware, getCarritoid)

export default router
