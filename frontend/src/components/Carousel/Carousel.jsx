import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../Context/fetchContext'
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.css' 


const ProductCarousel = () => {
  const { products, loading, error } = useContext(ProductContext)
  const navigate = useNavigate()

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error: {error}</p>
  if (!products.length) return <p>No hay productos disponibles.</p>


  const handleSlideClick = (type, id) => {
    navigate(`/${type}/${id}`)
  }

  return (
    <Carousel interval={3000} indicators={false}>
      {products.map(product => (
        <Carousel.Item key={product.id} className="costum-slice text-center p-4" onClick={() => handleSlideClick(product.type, product.id)}
          style={{ cursor: 'pointer' }}>
          <div className="d-flex flex-md-row align-items-center justify-content-between mx-auto mx-auto p-4 ">
            <div className='image-container '>
          <img
            src={product.image}
            alt={product.title}
            className="d-block ms-5 img-fluid"
            style={{ maxHeight: '300px', objectFit: 'contain' }}
          />
          </div>
          <div className='text-container d-flex flex-column text-center me-5'>
            <h5>{product.title}</h5>
            <p>{product.description}</p>
       </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
