import db from "../../bd/config.js";

export const obtieneCarrito = async () => {
  const query =
    "SELECT id, productid,userid,quantity,added_at,status,product,precio from  carrito   ;";
  const response = await db.query(query);
  return response.rows[0];
};


export const agregaCarrito = async (id, productid,userid,quantity,added_at,status,product,precio) => {
  const query =
      `insert into carrito (id, productid,userid,quantity,added_at,status,product,precio) 
       values default, (select id_product from inventario);`
  const response = await db.query(query);
  return response.rows[0];
};

export const borraCarrito = async (userId, productId) => {
    const query = `DELETE FROM carrito WHERE userid = $1 AND productid = $2 RETURNING * `;
    const values = [userId, productId];
    const result = await pool.query(query, values);
    return result.rowCount > 0;
}