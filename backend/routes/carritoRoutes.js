import { deleteCarrito } from '../src/controllers/carritoControllers.js'
import { Router } from 'express'
import {
  getCarritoid,
  postCarrito,
  putCarrito
} from '../src/controllers/carritoControllers.js'
import { authMiddleware } from '../src/middlewares/tokenMiddlewares.js'

const router = Router()

router.get('/cart/:userid', authMiddleware, getCarritoid)
router.post('/cart', authMiddleware, postCarrito)
router.put('/cart/:userid', authMiddleware, putCarrito) 
router.delete('/cart/:userid', authMiddleware, deleteCarrito)

export default router

