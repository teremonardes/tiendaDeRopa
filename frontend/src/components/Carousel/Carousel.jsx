import { useContext } from 'react'
import { ProductContext } from '../Context/fetchContext'
import Carousel from 'react-bootstrap/Carousel'


const ProductCarousel = () => {
  const { products, loading, error } = useContext(ProductContext)

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error: {error}</p>
  if (!products.length) return <p>No hay productos disponibles.</p>

  return (
    <Carousel interval={3000} indicators={false}>
      {products.map(product => (
        <Carousel.Item key={product.id} className="text-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="d-block mx-auto img-fluid"
            style={{ maxHeight: '300px', objectFit: 'contain' }}
          />
          <Carousel.Caption>
            <h5>{product.title}</h5>
            <p>{product.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
