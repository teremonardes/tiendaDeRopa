import db from '../../bd/config.js'

export const obtieneCarritoid = async (userid) => {
  const query = `
    SELECT 
      c.id AS carrito_id,
      c.productid,
      c.userid,
      c.quantity,
      c.added_at,
      c.status,
      p.product,
      p.description,
      p.price,
      p.image,
      p.type,
      p.is_favorite
    FROM carrito c
    JOIN inventario p ON c.productid = p.id_product
    WHERE c.userid = $1
  `
  const values = [userid]
  const response = await db.query(query, values)
  return response.rows
}

export const agregarProductoAlCarrito = async ({ userid, productid, quantity }) => {
  const existe = await db.query(
    'SELECT * FROM carrito WHERE userid = $1 AND productid = $2',
    [userid, productid]
  )

  if (existe.rows.length > 0) {
    const nuevaCantidad = existe.rows[0].quantity + quantity
    const actualizar = await db.query(
      'UPDATE carrito SET quantity = $1 WHERE userid = $2 AND productid = $3 RETURNING *',
      [nuevaCantidad, userid, productid]
    )
    return actualizar.rows[0]
  } else {
    const insertar = await db.query(
      `INSERT INTO carrito (userid, productid, quantity, added_at) 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING *`,
      [userid, productid, quantity]
    )
    return insertar.rows[0]
  }
}

export const actualizarCantidadCarrito = async ({ userid, productid, quantity }) => {
  if (quantity === 0) {
    const deleted = await db.query(
      'DELETE FROM carrito WHERE userid = $1 AND productid = $2 RETURNING *',
      [userid, productid]
    )
    return deleted.rows[0]
  } else {
    const updated = await db.query(
      'UPDATE carrito SET quantity = $1 WHERE userid = $2 AND productid = $3 RETURNING *',
      [quantity, userid, productid]
    )
    return updated.rows[0]
  }
}

export const vaciarCarrito = async (userid) => {
  const query = 'DELETE FROM carrito WHERE userid = $1 RETURNING *'
  const values = [userid]
  const result = await db.query(query, values)
  return result.rows
}
