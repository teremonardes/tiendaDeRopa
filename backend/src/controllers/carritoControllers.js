import { obtieneCarrito, agregaCarrito, borraCarrito } from "../models/carritoModels.js";

export const getCarrito = async (req, res) => {
  try {
    const carrito = await obtieneCarrito();
    res.status(200).json({ carrito });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
    console.error("Error", error);
  }
};





export const addCarrito = async (req, res) => {
  try {
    const { id, productId, product,quantity } = req.body;
    const cartItem = await agregaCarrito(userId, productId,product, quantity);
    res.status(200).json({ message: "Producto agregado al carrito", cartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const removeCarrito = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const success = await borraCarrito(userId, productId);
    if (success) {
      res.status(200).json({ message: "Producto eliminado del carrito" });
    } else {
      res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};