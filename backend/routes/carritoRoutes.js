import { Router } from 'express'

import {
    getCarrito,
    addCarrito,
    removeCarrito
} from "../src/controllers/carritoControllers.js";
// import { authMiddleware } from '../src/middlewares/middlewares.js'

const router = Router()

router.get('/carrito', getCarrito)
router.post("/add", addCarrito)
router.post("/remove", removeCarrito);

export default router