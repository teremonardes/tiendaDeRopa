import db from '../../bd/config.js'

export const obtieneCarritoid = async (userid) => {
  const query = 'SELECT id, productid, userid, quantity, added_at, status, product, precio FROM carrito WHERE userid = $1'
  const values = [userid]
  const response = await db.query(query, values)
  return response.rows
}
