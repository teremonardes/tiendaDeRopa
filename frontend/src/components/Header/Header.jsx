import { useState } from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => setShowAuth(false);
  const handleShow = () => setShowAuth(true);

  const handleAuth = (e) => {
    e.preventDefault();
    const form = e.target;
    const nombre = isLogin ? 'Usuario' : form.nombre.value;
    const email = form.email.value;
    const password = form.password.value;

    const user = { nombre, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    setShowAuth(false);
    navigate('/profile');
  };

  return (
    <header className='header d-flex justify-content-between align-items-center p-2'>
      <Link to='/' className='text-decoration-none btn btn-link'>
        <h1 className='header-title'>Mi Closet</h1>
      </Link>
      <div className="header-icons d-flex gap-3 align-items-center">
        <Link to='/cart' className='text-decoration-none p-2'>
          <FaShoppingCart size={24} />
        </Link>
        <FaUserCircle size={24} onClick={handleShow} style={{ cursor: 'pointer' }} />
      </div>

      <Modal show={showAuth} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center mb-3">
            <Button variant={isLogin ? 'primary' : 'outline-primary'} size="sm" className="me-2" onClick={() => setIsLogin(true)}>Iniciar Sesión</Button>
            <Button variant={!isLogin ? 'primary' : 'outline-primary'} size="sm" onClick={() => setIsLogin(false)}>Registrarse</Button>
          </div>
          <Form onSubmit={handleAuth}>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" type="text" placeholder="Tu nombre" required />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" placeholder="ejemplo@correo.com" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control name="password" type="password" placeholder="Tu contraseña" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default Header;
