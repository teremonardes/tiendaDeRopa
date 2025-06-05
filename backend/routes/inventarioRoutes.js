import { Router } from 'express'
import { getInventario } from '../src/controllers/inventarioControllers.js'
import { deleteProducto } from '../src/controllers/inventarioControllers.js'

const router = Router()

router.get('/inventario', getInventario)
router.delete('/products/:id', deleteProducto)

export default router
