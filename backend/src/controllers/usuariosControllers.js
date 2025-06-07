import db from '../../bd/config.js'
import jwt from 'jsonwebtoken'
import { registroUsuario, obtenerUsuarioPorEmail, eliminarUsuario, obtenerUsuarioPorId } from '../models/usuarioModels.js'
import 'dotenv/config.js'
import bcrypt from 'bcrypt'

export const registrarUsuario = async (req, res) => {
  const { nombre, apellido, mail, pass, telefono, direccion } = req.body

  if (!nombre || !apellido || !mail || !pass) {
    return res.status(400).json({ message: 'Faltan datos obligatorios.' })
  }

  try {
    // ¿El usuario ya existe?
    const existe = await obtenerUsuarioPorEmail(mail)

    if (existe) {
      return res.status(409).json({ error: 'Este correo ya está registrado' })
    }

    const result = await registroUsuario({ nombre, apellido, mail, pass, telefono, direccion })

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      usuario: {
        id: result.id,
        nombre: result.nombre,
        apellido: result.apellido,
        mail: result.mail
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
    return res.status(400).json({ message: 'Correo y contraseña son requeridos.' })
  }

  try {
    const usuario = await obtenerUsuarioPorEmail(mail)
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas.' })
    }
    const isPasswordValid = bcrypt.compareSync(pass, usuario.pass)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' })
    }
    const token = jwt.sign(
      { userId: usuario.id, mail: usuario.mail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.status(200).json({ message: 'Login exitoso', token })
  } catch (error) {
    console.error('Error en el login:', error)
    return res.status(500).json({ error: 'Error del servidor' })
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const { nombre, apellido, mail } = req.user
    res.status(200).json({
      message: 'Perfil de usuario',
      usuario: {
        nombre,
        apellido,
        mail
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' })
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await obtenerUsuarioPorId(id)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const result = await eliminarUsuario(id)
    res.status(200).json({ message: 'Usuario eliminado con éxito', result })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}
