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
import CreateProduct from './pages/CreateProduct/CreateProduct.jsx';
import ProductDetail from './pages/Product/Product.jsx'
import { CartProvider } from './components/Context/cartContext.jsx'


import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (

       <BrowserRouter>
    <UserProvider>
      <CartProvider>
      
      <ProductProvider>
        <Header />
        <NavbarT />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gallery" element={<Galeria />} />
          <Route path="/:type" element={<Galeria />} />
          <Route path="/:type/:id" element={<ProductDetail />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ProductProvider>
      </CartProvider>
    </UserProvider>
 </BrowserRouter>

  )
}

export default App
