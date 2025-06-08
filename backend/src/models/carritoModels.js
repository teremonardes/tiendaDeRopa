import db from "../../bd/config.js";

export const obtieneCarrito = async () => {
  const query =
    "SELECT id, productid,userid,quantity,added_at,status,product,precio from  carrito   ;";
  const response = await db.query(query);
  return response.rows[0];
};

export const obtieneCarritoid = async (userid) => {
  const query =
    `SELECT id, productid,userid,quantity,added_at,status,product,precio from  carrito where userid = $1 `;
  const values = [userid];
  const result = await pool.query(query, values);
  return response.rows[0];
};

