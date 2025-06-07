import db from '../../bd/config.js'
import jwt from 'jsonwebtoken'
import { registroUsuario, obtenerUsuarioPorEmail } from '../models/usuarioModels.js'
import 'dotenv/config.js'
import bcrypt from 'bcrypt'

export const registrarUsuario = async (req, res) => {
  const { nombre, apellido, mail, password } = req.body

  if (!nombre || !apellido || !mail || !password) {
    return res.status(400).json({ message: 'Faltan datos obligatorios.' })
  }

  try {
    // ¿El usuario ya existe?
    const existe = await db.query('SELECT * FROM usuario WHERE mail = $1', [mail])

    if (existe.rows.length > 0) {
      return res.status(409).json({ error: 'Este correo ya está registrado' })
    }

    const result = await registroUsuario({ nombre, apellido, mail, password })

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      usuario: {
        id: result.id,
        nombre: result.nombre,
        apellido: result.apellido,
        email: result.mail
      }
    })
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
}

export const loginUsuario = async (req, res) => {
  const { mail, pass } = req.body

  if (!mail || !pass) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos.' })
  }

  try {
    const usuario = await obtenerUsuarioPorEmail(mail)
    if (!usuario || usuario.pass !== pass) {
      return res.status(401).json({ message: 'Credenciales inválidas.' })
    }
    const isPasswordValid = bcrypt.compareSync(pass, usuario.pass)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'No autorizado' })
    }
    const token = jwt.sign(
      { userId: usuario.id, mail: usuario.mail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.status(200).json({ message: 'Login exitoso', token })
  } catch (error) {
    console.error('Error en el login:', error)
  }
}
