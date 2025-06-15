import {
  deleteCarrito,
  getCarritoid,
  postCarrito,
  putCarrito
} from '../src/controllers/carritoControllers.js'
import { Router } from 'express'

import { authMiddleware } from '../src/middlewares/tokenMiddlewares.js'

const router = Router()

router.get('/cart', authMiddleware, getCarritoid)
router.post('/cart', authMiddleware, postCarrito)
router.put('/cart', authMiddleware, putCarrito)
router.delete('/cart', authMiddleware, deleteCarrito)

export default router
