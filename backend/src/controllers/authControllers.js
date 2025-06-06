import db from '../../bd/config.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_jwt_muy_segura'

// 🔐 LOGIN
export const loginUser = async (req, res) => {
  const { mail, pass } = req.body

  if (!mail || !pass) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos.' })
  }

  try {
    const result = await db.query(
      'SELECT id, mail, pass, rol FROM usuario WHERE mail = $1',
      [mail]
    )
    const user = result.rows[0]

    if (!user || pass !== user.pass) {
      return res.status(401).json({ message: 'Credenciales inválidas.' })
    }

    const token = jwt.sign(
      { userId: user.id, mail: user.mail, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(200).json({ message: 'Login exitoso', token })
  } catch (error) {
    console.error('❌ Error en el login:\n', error.message, '\n', error.stack)
    return res.status(500).json({ message: 'Error interno del servidor.' })
  }
}

// 📝 REGISTRO
export const postRegistro = async (req, res) => {
  const { nombre, apellido, email, password } = req.body

  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ message: 'Faltan datos obligatorios.' })
  }

  try {
    const result = await db.query(
      'INSERT INTO usuario (nombre, apellido, mail, pass) VALUES ($1, $2, $3, $4) RETURNING id, nombre, apellido, mail',
      [nombre, apellido, email, password]
    )

    const nuevoUsuario = result.rows[0]

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      usuario: nuevoUsuario
    })
  } catch (error) {
    console.error('❌ Error al registrar usuario:\n', error.message, '\n', error.stack)
    return res.status(500).json({ message: 'Error al registrar usuario' })
  }
}
