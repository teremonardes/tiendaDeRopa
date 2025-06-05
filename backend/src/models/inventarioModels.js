import db from '../../bd/config.js'

export const obtenerInventario = async () => {
  const query = 'SELECT * FROM inventario'
  const response = await db.query(query)
  return response.rows
}

export const getInventarioID = async (id_product) => {
  const query = 'SELECT * FROM inventario WHERE id_product = $1'
  const value = [id_product]
  const response = await db.query(query, value)
  return response.rows[0]
}
