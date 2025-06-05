import { Router } from 'express'

import { getInventario, deleteProducto, getInventarioById } from '../src/controllers/inventarioControllers.js'

const router = Router()

router.get('/inventario', getInventario)
router.get('/inventario/:id_product', getInventarioById)
router.delete('/products/:id', deleteProducto)

export default router
