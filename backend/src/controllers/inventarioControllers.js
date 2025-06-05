import { obtenerInventario, eliminarProductoPorId } from '../models/inventarioModels.js'

export const getInventario = async (req, res) => {
  try {
    const inventario = await obtenerInventario()
    res.status(200).json({ inventario })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el inventario' })
    console.error('Error', error)
  }
}

export const deleteProducto = async (req, res) => {
  const { id } = req.params
  try {
    const productoEliminado = await eliminarProductoPorId(id)
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json({ mensaje: 'Producto eliminado correctamente', producto: productoEliminado })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' })
    console.error('Error', error)
  }
}
