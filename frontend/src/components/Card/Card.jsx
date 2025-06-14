import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useState, useContext } from 'react'
import Swal from 'sweetalert2'

import { userContext } from '../Context/userContext'
import { CartContext } from '../Context/cartContext'

const CardProduct = ({ id_product, product, price, image, description, is_favorite }) => {
  const { token } = useContext(userContext)
  const { addToCart } = useContext(CartContext)
  const [isFavorite, setIsFavorite] = useState(is_favorite)

  const toggleFavorite = () => {
    if (!token) {
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para guardar favoritos',
        confirmButtonText: 'Ok'
      })
      return
    }

    setIsFavorite((prev) => !prev)
    Swal.fire({
      icon: 'success',
      title: isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      timer: 1500,
      showConfirmButton: false
    })
  }

  const handleAddToCart = () => {
    addToCart({ id_product, product, price, quantity: 1 })
    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: `${product} se agregó al carrito`,
      timer: 1500,
      showConfirmButton: false
    })
  }

  return (
    <Card style={{ width: '18rem', backgroundColor: '#D4D0B9' }}>
      <Card.Img variant='top' src={image} className='p-3 img-fluid' style={{ height: '300px', objectFit: 'cover', width: '100%' }} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
          {product}
          <span onClick={toggleFavorite} style={{ cursor: 'pointer', color: 'red' }}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </span>
        </Card.Title>
        <div className='texto'>
          <div className='precio'>${price}</div>
          <div className='descripcion' style={{ height: '80px' }}>{description}</div>
        </div>
        <div className='botones d-flex justify-content-between'>
          <NavLink to={`/inventario/${id_product}`}>
            <Button style={{ backgroundColor: '#617891' }}>Ver más</Button>
          </NavLink>

          <Button
            variant='dark'
            onClick={handleAddToCart}
          >
            Añadir 🛒
          </Button>

        </div>
      </Card.Body>
    </Card>
  )
}

export default CardProduct
