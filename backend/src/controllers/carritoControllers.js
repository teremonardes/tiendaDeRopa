import { obtieneCarrito, obtieneCarritoid,agregaCarrito, borraCarrito } from "../models/carritoModels.js";

export const getCarrito = async (req, res) => {
  try {
    const carrito = await obtieneCarrito();
    res.status(200).json({ carrito });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
    console.error("Error", error);
  }
};

export const getCarritoid = async (req, res) => {
  try {
    const carrito = await obtieneCarritoid();
    res.status(200).json({ carrito });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
    console.error("Error", error);
  }
};





