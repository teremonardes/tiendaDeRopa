import db from '../../bd/config.js'
import bcrypt from 'bcrypt'

export const registroUsuario = async ({ nombre, apellido, mail, pass, telefono, direccion }) => {
  const hashedPass = bcrypt.hashSync(pass, 10)
  const query = `
    INSERT INTO usuario (nombre, apellido, mail, pass, telefono, direccion) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`
  const values = [nombre, apellido, mail, hashedPass, telefono, direccion]
  const result = await db.query(query, values)
  return result.rows[0]
}

export const obtenerUsuarioPorEmail = async (mail) => {
  const query = 'SELECT * FROM usuario WHERE mail = $1'
  const values = [mail]
  const result = await db.query(query, values)
  return result.rows[0]
}

export const obtenerUsuarioPorId = async (id) => {
  const query = 'SELECT * FROM usuario WHERE id = $1'
  const values = [id]
  const result = await db.query(query, values)
  return result.rows[0]
}

export const eliminarUsuario = async (id) => {
  const query = 'DELETE FROM usuario WHERE id = $1 RETURNING *'
  const values = [id]
  const result = await db.query(query, values)
  return result.rows[0]
}
