import { obtieneCarritoid } from '../models/carritoModels.js'

export const getCarritoid = async (req, res) => {
  try {
    const { userid } = req.params
    if (parseInt(userid) !== req.user.userId) {
      return res.status(403).json({ error: 'No tienes permisos para ver este carrito' })
    }
    const carrito = await obtieneCarritoid(userid)
    res.status(200).json({ carrito })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' })
    console.error('Error', error)
  }
}
