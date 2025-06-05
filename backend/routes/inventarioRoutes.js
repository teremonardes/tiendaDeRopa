import { Router } from 'express'
import { getInventario, getInventarioById } from '../src/controllers/inventarioControllers.js'

const router = Router()

router.get('/inventario', getInventario)
router.get('/inventario/:id_product', getInventarioById)

export default router
