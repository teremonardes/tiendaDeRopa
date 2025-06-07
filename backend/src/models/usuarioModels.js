import db from '../../bd/config.js'
import bycrypt from 'bcrypt'

export const registroUsuario = async ({ nombre, mail, pass }) => {
  const hashedPassword = bycrypt.hashSync(pass, 10)
  const query = 'INSERT INTO usuario (nombre, email, password) VALUES ($1, $2, $3) RETURNING *'
  const values = [nombre, mail, hashedPassword]
  const result = await db.query(query, values)
  return result.rows[0]
}

export const obtenerUsuarioPorEmail = async (mail) => {
  const query = 'SELECT * FROM usuario WHERE mail = $1'
  const values = [mail]
  const result = await db.query(query, values)
  return result.rows[0]
}
