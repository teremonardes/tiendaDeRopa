import { useState, useContext, useEffect } from 'react'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'

import { userContext } from '../../components/Context/userContext'
import LoginForm from '../../pages/Login/Login'
import RegisterForm from '../../pages/Register/Register'

import './Header.css'

const Header = () => {
  const [showAuth, setShowAuth] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const { user } = useContext(userContext)

  const handleClose = () => setShowAuth(false)
  const handleShow = () => setShowAuth(true)

  const handleUserIconClick = () => {
    if (user) {
      navigate('/profile')
    } else {
      handleShow()
    }
  }

  useEffect(() => {
    if (user) setShowAuth(false)
  }, [user])

  return (
    <header className='header d-flex justify-content-between align-items-center p-2'>
      <Link to='/' className='text-decoration-none btn btn-link'>
        <h1 className='header-title'>Mi Closet</h1>
      </Link>
      <div className='header-icons d-flex gap-3 align-items-center'>
        <Link to='/cart' className='text-decoration-none p-2'>
          <FaShoppingCart size={24} />
        </Link>
        <FaUserCircle
          size={24}
          onClick={handleUserIconClick}
          style={{ cursor: 'pointer' }}
        />

      </div>

      <Modal show={showAuth} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center mb-3'>
            <Button
              variant={isLogin ? 'primary' : 'outline-primary'}
              size='sm'
              className='me-2'
              onClick={() => setIsLogin(true)}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant={!isLogin ? 'primary' : 'outline-primary'}
              size='sm'
              onClick={() => setIsLogin(false)}
            >
              Registrarse
            </Button>
          </div>
          {isLogin ? <LoginForm onSuccess={handleClose} /> : <RegisterForm onSuccess={handleClose} />}
        </Modal.Body>
      </Modal>
    </header>
  )
}

export default Header
