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
