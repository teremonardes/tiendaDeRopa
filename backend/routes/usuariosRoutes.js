import express from 'express';
import { registrarUsuario } from '../src/controllers/usuariosControllers.js';

const router = express.Router();

router.post('/register', registrarUsuario);

export default router;
