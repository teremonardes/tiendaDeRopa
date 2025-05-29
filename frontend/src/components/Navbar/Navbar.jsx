import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import './Navbar.css'

<<<<<<< HEAD
=======

>>>>>>> 7750dfa (login)
const NavbarT = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="w-100 d-flex justify-content-around">
<<<<<<< HEAD
          <Nav.Link as={Link} to="/poleras" className='link-nav'>Poleras</Nav.Link>
          <Nav.Link as={Link} to="/pantalones" className='link-nav'>Pantalones</Nav.Link>
          <Nav.Link as={Link} to="/chaquetas" className='link-nav'>Chaquetas</Nav.Link>
          <Nav.Link as={Link} to="/mas" className='link-nav'>Mas</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavbarT
=======
          <Nav.Link as={Link} to="/poleras" className="link-nav">Poleras</Nav.Link>
          <Nav.Link as={Link} to="/pantalones" className="link-nav">Pantalones</Nav.Link>
          <Nav.Link as={Link} to="/chaquetas" className="link-nav">Chaquetas</Nav.Link>
          <Nav.Link as={Link} to="/mas" className="link-nav">Más</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarT;
>>>>>>> 7750dfa (login)
