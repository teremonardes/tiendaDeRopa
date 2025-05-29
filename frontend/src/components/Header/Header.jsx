<<<<<<< HEAD
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header d-flex justify-content-between align-items-center p-2'>

      <Link to='/' className='text-decoration-none btn  btn-link'> <h1 className='header-title'>Mi Closet</h1>
      </Link>
      <div className="header-icons d-flex gap-3">
        <Link to='/cart' className='text-decoration-none p-2'>
        <FaShoppingCart size={24} />
        </Link>
        <Link to='/profile' className='text-decoration-none p-2'>
        <FaUserCircle size={24} />
        </Link>
      </div>
    </header>
  )
}

export default Header
=======
import { useState } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Inicio de sesión exitoso!');
    handleClose();
  };

  return (
    <>
      <header className='header d-flex justify-content-between align-items-center p-2'>
        <Link to='/' className='text-decoration-none btn btn-link'>
          <h1 className='header-title'>Mi Closet</h1>
        </Link>
        <div className="header-icons d-flex gap-3">
          <Link to='/cart' className='text-decoration-none p-2'>
            <FaShoppingCart size={24} />
          </Link>
          <FaUser size={24} onClick={handleShow} style={{ cursor: 'pointer' }} />
        </div>
      </header>

      <Modal show={showLogin} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="ejemplo@correo.com" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Tu contraseña" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
>>>>>>> 7750dfa (login)
