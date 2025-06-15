import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../../components/Context/fetchContext'
import { CartContext } from '../../components/Context/cartContext'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

const ProductDetail = () => {
  const { id_product } = useParams()
  const { fetchProductById } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      try {
        const data = await fetchProductById(id_product)
        setProduct(data.producto || data)
        setError(null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getProduct()
  }, [id_product, fetchProductById])

  const increase = () => setQuantity(prev => prev + 1)
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id_product, quantity)
      Swal.fire({
        icon: 'success',
        title: '¡Agregado al carrito!',
        text: `${product.product} x ${quantity}`,
        timer: 2000,
        showConfirmButton: false
      })
    }
  }

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    })
  }

  if (loading) return <p>Cargando producto...</p>
  if (error) return <p>Error: {error}</p>
  if (!product) return <p>No se encontró el producto.</p>

  return (
    <div className='container d-flex justify-content-center align-items-center p-4 m-2 mb-4'>
      <div className='row mx-0 w-100' style={{ maxWidth: '900px' }}>
        <div className='col-md-6 d-flex justify-content-center'>
          <img src={product.image} alt={product.product} className='img-fluid w-75 rounded' />
        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center'>
          <h2>{product.product}</h2>
          <p>{product.description}</p>
          <h4>{formatPrice(product.price)}</h4>

          <div className='d-flex align-items-center my-3'>
            <Button variant='secondary' onClick={decrease}>-</Button>
            <span className='mx-3'>{quantity}</span>
            <Button variant='secondary' onClick={increase}>+</Button>
          </div>

          <Button
            variant='dark'
            onClick={handleAddToCart}
            disabled={!product || product.stock <= 0}
          >
            {product.stock > 0 ? 'Agregar al carrito 🛒' : 'Sin stock'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
