import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { URLBASE } from '../../config/constants.js'

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('token') || ''

  const api = axios.create({
    baseURL: `${URLBASE}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // Obtener todo el inventario
  const fetchAllProducts = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/inventario')
      setProducts(data.inventario)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener productos')
    } finally {
      setLoading(false)
    }
  }

  // Obtener por categoría
  const fetchProductsByType = async (type) => {
    setLoading(true)
    try {
      const { data } = await api.get(`/category/${type}`)
      setProducts(data.inventario)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener productos por categoría')
    } finally {
      setLoading(false)
    }
  }

  // Obtener productos del usuario autenticado
  const fetchUserProducts = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/products/me')
      setProducts(data.inventario)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener tus productos')
    } finally {
      setLoading(false)
    }
  }

  // Obtener por ID
  const fetchProductById = async (id) => {
    try {
      const { data } = await api.get(`/inventario/${id}`)
      return data
    } catch (err) {
      throw err.response?.data?.error || 'Error al obtener producto por ID'
    }
  }

  // Crear producto
  const createProduct = async (productData) => {
    try {
      const { data } = await api.post('/inventario', productData)
      await fetchUserProducts()
      return data
    } catch (err) {
      throw err.response?.data?.error || 'Error al crear producto'
    }
  }

  // Editar producto
  const editProduct = async (id, productData) => {
    try {
      const { data } = await api.put(`/inventario/${id}`, productData)
      await fetchUserProducts()
      return data
    } catch (err) {
      throw err.response?.data?.error || 'Error al editar producto'
    }
  }

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      const { data } = await api.delete(`/products/${id}`)
      await fetchUserProducts()
      return data
    } catch (err) {
      throw err.response?.data?.error || 'Error al eliminar producto'
    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const contextValue = {
    products,
    loading,
    error,
    fetchAllProducts,
    fetchProductsByType,
    fetchUserProducts,
    fetchProductById,
    createProduct,
    editProduct,
    deleteProduct
  }

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
