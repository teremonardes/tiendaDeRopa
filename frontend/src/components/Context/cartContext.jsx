import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { URLBASE } from '../../config/constants.js'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const token = localStorage.getItem('token')

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${URLBASE}/cart`, axiosConfig)
      setCart(response.data.carrito)
    } catch (error) {
      console.error('❌ Error al cargar el carrito:', error)
    }
  }

  useEffect(() => {
    if (token) fetchCart()
  }, [token])

  const addToCart = async (product) => {
    try {
      await axios.post(
        `${URLBASE}/cart`,
        {
          productid: product.id,
          quantity: 1
        },
        axiosConfig
      )
      fetchCart()
    } catch (error) {
      console.error('❌ Error al agregar al carrito:', error)
    }
  }

  const decreaseQuantity = async (product) => {
    const item = cart.find((i) => i.productid === product.productid)
    if (!item || item.quantity <= 1) return

    try {
      await axios.put(
        `${URLBASE}/cart`,
        {
          productid: item.productid,
          quantity: item.quantity - 1
        },
        axiosConfig
      )
      fetchCart()
    } catch (error) {
      console.error('❌ Error al disminuir cantidad:', error)
    }
  }

  const removeFromCart = async (product) => {
    try {
      await axios.put(
        `${URLBASE}/cart`,
        {
          productid: product.productid,
          quantity: 0
        },
        axiosConfig
      )
      fetchCart()
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error)
    }
  }

  const clearCart = async () => {
    try {
      await axios.delete(`${URLBASE}/cart`, axiosConfig)
      setCart([])
    } catch (error) {
      console.error('❌ Error al vaciar carrito:', error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
