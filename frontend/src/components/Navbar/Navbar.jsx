import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const categories = [
  { name: 'Poleras', path: 'polera' },
  { name: 'Pantalones', path: 'pantalon' },
  { name: 'Chaquetas', path: 'chaqueta' }
]

const NavbarT = () => {
  return (
    <Navbar bg='light' data-bs-theme='light'>
      <Container>
        <Nav className='w-100 d-flex justify-content-around'>
          {categories.map((cat) => (
            <Nav.Link
              as={NavLink}
              key={cat.path}
              to={`/category/${cat.path}`}
              className={({ isActive }) => isActive ? 'link-nav active-link' : 'link-nav'}
            >
              {cat.name}
            </Nav.Link>
          ))}
          <Nav.Link
            as={NavLink}
            to='/inventario'
            className={({ isActive }) => isActive ? 'link-nav active-link' : 'link-nav'}
          >
            Más
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarT
