import db from '../../bd/config.js'

export const obtenerInventario = async () => {
  const query = 'SELECT id_product, product, description, price, image, stock, type, is_favorite, userid FROM inventario'
  const response = await db.query(query)
  return response.rows
}

export const eliminarProductoPorId = async (id) => {
  const query = 'DELETE FROM inventario WHERE id_product = $1 RETURNING *'
  const values = [id]
  const response = await db.query(query, values)
  return response.rows[0]
}

export const getInventarioID = async (id_product) => {
  const query = 'SELECT * FROM inventario WHERE id_product = $1'
  const value = [id_product]
  const response = await db.query(query, value)
  return response.rows[0]
}

export const getInventariotype = async (type) => {
  const query = 'SELECT * FROM inventario WHERE type = $1'
  const value = [type]
  const response = await db.query(query, value)
  return response.rows
}

export const getInventarioUser = async (userid) => {
  const query = 'SELECT * FROM inventario WHERE userid = $1'
  const value = [userid]
  const response = await db.query(query, value)
  return response.rows
}

export const agregarProducto = async ({ product, description, price, image, stock, type, is_favorite, userid }) => {
  const query = 'INSERT INTO inventario (product, description, price, image, stock, type, is_favorite, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
  const values = [product, description, price, image, stock, type, is_favorite, userid]
  const response = await db.query(query, values)
  return response.rows[0]
}

export const editarProducto = async (id_product, product, description, price, image, stock, type, is_favorite) => {
  const query = 'UPDATE inventario SET product = $1, description = $2, price = $3, image = $4, stock = $5, type = $6, is_favorite = $7 WHERE id_product = $8 RETURNING *'
  const values = [product, description, price, image, stock, type, is_favorite, id_product]
  const response = await db.query(query, values)
  return response.rows[0]
}
