import db from '../../bd/config.js'

export const obtenerInventario = async () => {
  // CAMBIO: Usar 'id_product' y 'product' de tu esquema actual
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
