
import { Router } from 'express';

import { loginUser } from '../src/controllers/authControllers.js'; // <-- ¡Verifica esta ruta!

const router = Router();


router.post('/login', loginUser);

export default router;