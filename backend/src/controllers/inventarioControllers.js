import { obtenerInventario } from '../models/inventarioModels.js'

export const getInventario = async (req, res) => {
  try {
    const inventario = await obtenerInventario()
    res.status(200).json({ inventario })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el inventario' })
    console.error('Error', error)
  }
}
