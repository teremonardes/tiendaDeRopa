import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState, useContext } from 'react';

import { userContext } from '../Context/userContext';
import { CartContext } from '../Context/cartContext'; 

const CardProduct = ({ id, title, price, image, description, type, is_favorite,modoEdicion = false }) => {
  const { token } = useContext(userContext);
  const { addToCart } = useContext(CartContext); 
  const [isFavorite, setIsFavorite] = useState(is_favorite);

  const toggleFavorite = () => {
    if (!token) {
      alert('Debes iniciar sesión para guardar favoritos');
      return;
    }

    setIsFavorite((prev) => !prev);
  };

  return (
    <Card style={{ width: '18rem', backgroundColor: '#D4D0B9' }}>
      <Card.Img variant='top' src={image} className='p-3 img-fluid' style={{ height: '300px', objectFit: 'cover', width: '100%' }} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
          {title}
          <span onClick={toggleFavorite} style={{ cursor: 'pointer', color: 'red' }}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </span>
        </Card.Title>
        <div className='texto'>
          <div className='precio'>${price}</div>
          <div className='descripcion' style={{height:'80px'}}>{description}</div>
        </div>
        <div className='botones d-flex justify-content-between'>
          <NavLink to={`/${type}/${id}`}>
            <Button style={{ backgroundColor: '#617891' }}>Ver más</Button>
          </NavLink>

    {
  modoEdicion ? (
    <NavLink to={`/editar-producto/${id}`}>
      <Button variant='warning'>Editar</Button>
    </NavLink>
  ) : (
    <Button
      variant='dark'
      onClick={() => addToCart({ id, title, price, quantity: 1 })}
    >
      Añadir 🛒
    </Button>
  )
}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
