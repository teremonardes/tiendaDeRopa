import { obtenerInventario, eliminarProductoPorId, getInventarioID, getInventariotype, editarProducto, agregarProducto, getInventarioUser } from '../models/inventarioModels.js'

export const getInventario = async (req, res) => {
  try {
    const inventario = await obtenerInventario()
    res.status(200).json({ inventario })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el inventario' })
    console.error('Error', error)
  }
}

export const getInventariocat = async (req, res) => {
  try {
    const { type } = req.params
    const inventario = await getInventariotype(type)
    res.status(200).json({ inventario })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el inventario' })
    console.error('Error', error)
  }
}

export const getInventarioUserController = async (req, res) => {
  try {
    const { userId } = req.user
    const inventario = await getInventarioUser(userId)
    res.status(200).json({ inventario })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el inventario del usuario' })
    console.error('Error', error)
  }
}

export const deleteProducto = async (req, res) => {
  const { id } = req.params
  try {
    const producto = await getInventarioID(id)
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    if (producto.userid !== req.user.userId) {
      return res.status(403).json({ message: 'No tienes permisos para eliminar este producto' })
    }
    const productoEliminado = await eliminarProductoPorId(id)
    res.json({ mensaje: 'Producto eliminado correctamente', producto: productoEliminado })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' })
    console.error('Error', error)
  }
}

export const getInventarioById = async (req, res) => {
  try {
    const { id_product } = req.params
    const producto = await getInventarioID(id_product)
    res.status(200).json(producto)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el inventario por ID' })
  }
}

export const crearProducto = async (req, res) => {
  console.log('Usuario autenticado:', req.user)
  console.log('BODY RECIBIDO:', req.body)
  try {
    const { product, description, price, image, stock, type, is_favorite } = req.body
    const { userId } = req.user
    if (!product || !description || !price || !image || !stock || !type) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' })
    }
    const nuevoProducto = await agregarProducto({ product, description, price, image, stock, type, is_favorite, userid: userId })
    res.status(201).json({ mensaje: 'Producto agregado correctamente', producto: nuevoProducto })
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' })
  }
}

export const editarProductoController = async (req, res) => {
  try {
    const { id_product } = req.params
    const { product, description, price, image, stock, type, is_favorite } = req.body
    if (!product || !description || !price || !image || !stock || !type) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' })
    }
    const productoExistente = await getInventarioID(id_product)
    if (!productoExistente) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    if (productoExistente.userid !== req.user.userId) {
      return res.status(403).json({ error: 'No tienes permisos para editar este producto' })
    }
    const productoEditado = await editarProducto(id_product, product, description, price, image, stock, type, is_favorite)
    res.status(200).json({ mensaje: 'Producto editado correctamente', producto: productoEditado })
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el producto' })
  }
}
