import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {
  registroUsuario,
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorId,
  eliminarUsuario
} from '../models/usuarioModels.js'
import 'dotenv/config.js'

// Registrar nuevo usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, mail, pass, telefono, direccion } = req.body
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

// Login
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
      {
        userId: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        mail: usuario.mail
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({ message: 'Login exitoso', token })
  } catch (error) {
    console.error('Error en el login:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
}

// Perfil de usuario autenticado
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user
    const usuario = await obtenerUsuarioPorId(userId)

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.status(200).json({
      message: 'Perfil de usuario',
      usuario: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        mail: usuario.mail
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' })
  }
}

// Eliminar usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await obtenerUsuarioPorId(id)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    await eliminarUsuario(id)
    res.status(200).json({ message: 'Usuario eliminado con éxito' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}
