import {
  obtieneCarritoid,
  agregarProductoAlCarrito,
  actualizarCantidadCarrito
  , vaciarCarrito
} from '../models/carritoModels.js'

export const getCarritoid = async (req, res) => {
  try {
    const { userid } = req.params
    if (parseInt(userid) !== req.user.userId) {
      return res.status(403).json({ error: 'No tienes permisos para ver este carrito' })
    }
    const carrito = await obtieneCarritoid(userid)
    res.status(200).json({ carrito })
  } catch (error) {
    console.error('Error al obtener el carrito:', error)
    res.status(500).json({ error: 'Error al obtener el carrito' })
  }
}

export const postCarrito = async (req, res) => {
  try {
    const { productid, quantity } = req.body
    const userid = req.user.userId

    if (!productid || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Faltan datos o cantidad inválida' })
    }

    const resultado = await agregarProductoAlCarrito({ userid, productid, quantity })
    res.status(201).json({
      mensaje: '✅ Producto agregado al carrito correctamente',
      item: resultado
    })
  } catch (error) {
    console.error('❌ Error al agregar al carrito:', error)
    res.status(500).json({ error: 'Error al agregar producto al carrito' })
  }
}

export const putCarrito = async (req, res) => {
  try {
    const { userid } = req.params
    const { productid, quantity } = req.body

    if (parseInt(userid) !== req.user.userId) {
      return res.status(403).json({ error: 'No tienes permisos para modificar este carrito' })
    }

    if (!productid || !quantity || quantity < 0) {
      return res.status(400).json({ error: 'Faltan datos o cantidad inválida' })
    }

    const actualizado = await actualizarCantidadCarrito({ userid, productid, quantity })
    res.status(200).json({ mensaje: 'Cantidad actualizada correctamente', item: actualizado })
  } catch (error) {
    console.error('❌ Error al actualizar carrito:', error)
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto' })
  }
}

export const deleteCarrito = async (req, res) => {
  try {
    const { userid } = req.params

    if (parseInt(userid) !== req.user.userId) {
      return res.status(403).json({ error: 'No tienes permisos para vaciar este carrito' })
    }

    const resultado = await vaciarCarrito(userid)

    res.status(200).json({
      mensaje: '🗑️ Carrito eliminado correctamente',
      eliminado: resultado
    })
  } catch (error) {
    console.error('❌ Error al vaciar el carrito:', error)
    res.status(500).json({ error: 'Error al vaciar el carrito' })
  }
}
