import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ProductProvider from './components/Context/fetchContext'

import NavbarT from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import NotFound from './pages/NotFound/NotFound'
import Footer from './components/Footer/Footer'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Galeria from './pages/Gallery/Gallery'
import Checkout from './pages/CheckOut/Checkout'
import UserProvider from './components/Context/userContext'
import CreateProduct from './pages/CreateProduct/CreateProduct.jsx'
import ProductDetail from './pages/Product/Product.jsx'
import MisProductos from './pages/MyProducts/MyProducts.jsx'
import EditarProducto from './pages/EditProduct/EditProduct.jsx'

import { CartProvider } from './components/Context/cartContext.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App () {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <Header />
            <NavbarT />
            <Routes>
              {/* Página de inicio */}
              <Route path='/' element={<Home />} />

              {/* Carrito y checkout */}
              <Route path='/cart/:userid' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />

              {/* Registro y perfil */}
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />

              {/* Galerías */}
              <Route path='/inventario' element={<Galeria />} />
              <Route path='category/:type' element={<Galeria />} />

              {/* Detalle de producto */}
              <Route path='/inventario/:id_product' element={<ProductDetail />} />

              {/* Productos del usuario */}
              <Route path='/products/me' element={<MisProductos />} />

              {/* Editar producto (unificamos el param a :id_product) */}
              <Route path='/editar/:id_product' element={<EditarProducto />} />

              {/* Crear producto */}
              <Route path='/create-product' element={<CreateProduct />} />

              {/* Página 404 */}
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
