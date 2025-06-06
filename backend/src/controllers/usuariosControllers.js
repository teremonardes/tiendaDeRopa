import db from '../../bd/config.js'

export const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' })
  }

  try {
    // ¿El usuario ya existe?
    const existe = await db.query('SELECT * FROM usuarios WHERE email = $1', [email])

    if (existe.rows.length > 0) {
      return res.status(409).json({ error: 'Este correo ya está registrado' })
    }

    // Crear nuevo usuario
    await db.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)',
      [nombre, email, password]
    )

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' })
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
}
