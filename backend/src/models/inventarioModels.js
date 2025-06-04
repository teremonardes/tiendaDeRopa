import db from '../../bd/config.js'

export const obtenerInventario = async () => {
  const query = 'SELECT * FROM inventario'
  const response = await db.query(query)
  return response.rows
}
