import { Router } from 'express'

import {
    getCarrito,
    getCarritoid   
} from "../src/controllers/carritoControllers.js";
// import { authMiddleware } from '../src/middlewares/middlewares.js'

const router = Router()

router.get('/cart', getCarrito)
router.get('/cart/:userid',getCarritoid)


export default router