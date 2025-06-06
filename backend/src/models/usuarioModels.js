import db from '../../bd/config.js'

export const registrarUsuario = async ({ nombre, email, password }) => {
  const query = 'INSERT INTO usuario (nombre, email, password) VALUES ($1, $2, $3) RETURNING *'
  const values = [nombre, email, password]
  const result = await db.query(query, values)
  return result.rows[0]
}
