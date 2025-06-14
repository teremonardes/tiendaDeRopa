import { Router } from 'express'

import { getInventario, deleteProducto, getInventarioById, getInventariocat, editarProductoController, crearProducto, getInventarioUserController } from '../src/controllers/inventarioControllers.js'
import { authMiddleware } from '../src/middlewares/tokenMiddlewares.js'

const router = Router()

router.get('/inventario', getInventario)
router.get('/inventario/:id_product', getInventarioById)
router.get('/category/:type', getInventariocat)
router.get('/products/me', authMiddleware, getInventarioUserController)
router.delete('/products/:id', authMiddleware, deleteProducto)
router.put('/inventario/:id_product', authMiddleware, editarProductoController)
router.post('/inventario', authMiddleware, crearProducto)

export default router
