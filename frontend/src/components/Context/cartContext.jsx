import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { URLBASE } from '../../config/constants.js'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const api = axios.create({
    baseURL: URLBASE
  })

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || ''
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  const fetchCart = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/cart')
      setCart(data.carrito)
      setError(null)
    } catch (err) {
      console.error('❌ Error al cargar el carrito:', err)
      setError(err.response?.data?.error || 'Error al cargar el carrito')
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product, quantity = 1) => {
    try {
      await api.post('/cart', {
        productid: product.productid,
        quantity
      })
      await fetchCart()
    } catch (err) {
      console.error('❌ Error al agregar al carrito:', err)
      setError(err.response?.data?.error || 'Error al agregar al carrito')
    }
  }

  const decreaseQuantity = async (product) => {
    const item = cart.find((i) => i.productid === product.productid)
    if (!item || item.quantity <= 1) return

    try {
      await api.put('/cart', {
        productid: item.productid,
        quantity: item.quantity - 1
      })
      await fetchCart()
    } catch (err) {
      console.error('❌ Error al disminuir cantidad:', err)
      setError(err.response?.data?.error || 'Error al disminuir cantidad')
    }
  }

  const removeFromCart = async (product) => {
    try {
      await api.put('/cart', {
        productid: product.productid,
        quantity: 0
      })
      await fetchCart()
    } catch (err) {
      console.error('❌ Error al eliminar producto:', err)
      setError(err.response?.data?.error || 'Error al eliminar producto')
    }
  }

  const clearCart = async () => {
    try {
      await api.delete('/cart')
      setCart([])
    } catch (err) {
      console.error('❌ Error al vaciar carrito:', err)
      setError(err.response?.data?.error || 'Error al vaciar carrito')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCart,
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
