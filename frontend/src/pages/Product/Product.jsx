import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../../components/Context/fetchContext'
import { CartContext } from '../../components/Context/cartContext'
import { Button } from 'react-bootstrap'

const ProductDetail = () => {
  const { id } = useParams()
  const { products } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id))
    setProduct(found)
  }, [id, products])

  const increase = () => setQuantity(prev => prev + 1)
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
   addToCart(product, quantity)

  }

  if (!product) return <p>Cargando producto...</p>

return (
  <div
    className="container d-flex justify-content-center align-items-center p-4 m-2 mb-4"

  >
    <div className="row mx-0 w-100" style={{ maxWidth: '900px' }}>
      <div className="col-md-6 d-flex justify-content-center">
        <img src={product.image} alt={product.title} className="img-fluid w-75 rounded" />
      </div>
      <div className="col-md-6 d-flex flex-column justify-content-center">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h4>${product.price}</h4>

        <div className="d-flex align-items-center my-3">
          <Button variant="secondary" onClick={decrease}>-</Button>
          <span className="mx-3">{quantity}</span>
          <Button variant="secondary" onClick={increase}>+</Button>
        </div>

        <Button variant="dark" onClick={handleAddToCart}>
          Agregar al carrito 🛒
        </Button>
      </div>
    </div>
  </div>
)


}

export default ProductDetail
