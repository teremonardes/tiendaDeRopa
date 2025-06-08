import { obtenerUsuarioPorEmail } from '../models/usuarioModels.js'

export const validarRegistro = async (req, res, next) => {
  try {
    const { nombre, apellido, mail, pass } = req.body

    if (!nombre || !apellido || !mail || !pass) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' })
    }

    const existe = await obtenerUsuarioPorEmail(mail)
    if (existe) {
      return res.status(409).json({ error: 'Este correo ya está registrado' })
    }

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Hubo un problema al procesar la solicitud.' })
  }
}
