import { Router } from 'express'
import { getInventario } from '../src/controllers/inventarioControllers.js'

const router = Router()

router.get('/inventario', getInventario)

export default router
