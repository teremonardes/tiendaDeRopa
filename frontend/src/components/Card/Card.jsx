import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useState, useContext } from 'react'
import Swal from 'sweetalert2'

import { userContext } from '../Context/userContext'
import { CartContext } from '../Context/cartContext'
import { URLBASE } from '../../config/constants'

const CardProduct = ({ id_product, product, price, image, description, is_favorite, modoEdicion }) => {
  const { token } = useContext(userContext)
  const { addToCart } = useContext(CartContext)
  const [isFavorite, setIsFavorite] = useState(is_favorite)
  const navigate = useNavigate()

  const toggleFavorite = async () => {
    if (!token) {
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para guardar favoritos',
        confirmButtonText: 'Ok'
      })
      return
    }

    try {
      const updatedFavorite = !isFavorite

      const updatedProduct = {
        id_product,
        product,
        description,
        price,
        image,
        stock: 1, // puedes ajustar si tienes stock real
        type: 'general', // o el tipo correcto si lo tienes disponible
        is_favorite: updatedFavorite
      }

      const response = await fetch(`${URLBASE}/inventario/${id_product}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al actualizar favorito')
      }

      setIsFavorite(updatedFavorite)

      Swal.fire({
        icon: 'success',
        title: updatedFavorite ? 'Agregado a favoritos' : 'Eliminado de favoritos',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error al actualizar favorito:', error.message)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      })
    }
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

  const handleEdit = () => {
    navigate(`/editar/${id_product}`)
  }

  return (
    <Card style={{ width: '18rem', backgroundColor: '#D4D0B9' }}>
      <Card.Img
        variant='top'
        src={image}
        className='p-3 img-fluid'
        style={{ height: '300px', objectFit: 'cover', width: '100%' }}
      />
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

          {modoEdicion
            ? (
              <Button
                variant='warning'
                onClick={handleEdit}
              >
                Editar producto
              </Button>
              )
            : (
              <Button
                variant='dark'
                onClick={handleAddToCart}
              >
                Añadir 🛒
              </Button>
              )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default CardProduct
