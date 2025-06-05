import { Router } from 'express'

import { getInventario } from '../src/controllers/inventarioControllers.js'
import { deleteProducto } from '../src/controllers/inventarioControllers.js'


const router = Router()

router.get('/inventario', getInventario)

router.delete('/products/:id', deleteProducto)

router.get('/inventario/:id_product', getInventarioById)

export default router
