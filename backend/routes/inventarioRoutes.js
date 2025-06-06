import { Router } from 'express'

import { getInventario, deleteProducto, getInventarioById, editarProductoController, crearProducto } from '../src/controllers/inventarioControllers.js'
// import { authMiddleware } from '../src/middlewares/middlewares.js'

const router = Router()

router.get('/inventario', getInventario)
router.get('/inventario/:id_product', getInventarioById)
router.delete('/products/:id', deleteProducto)
router.put('/products/:id_product', editarProductoController)
router.post('/inventario', crearProducto)

export default router
