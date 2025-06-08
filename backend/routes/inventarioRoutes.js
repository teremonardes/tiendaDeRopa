import { Router } from 'express'

import { getInventario, deleteProducto, getInventarioById,getInventariocat, editarProductoController, crearProducto } from '../src/controllers/inventarioControllers.js'
// import { authMiddleware } from '../src/middlewares/middlewares.js'

const router = Router()

router.get('/inventario', getInventario)
router.get('/inventario/:id_product', getInventarioById)
router.get("/products/category/:type", getInventariocat);
router.delete('/products/:id', deleteProducto)
router.put('/products/:id_product', editarProductoController)
router.post('/inventario', crearProducto)

export default router
