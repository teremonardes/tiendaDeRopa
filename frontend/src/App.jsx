import { Routes, Route } from 'react-router-dom'
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

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <UserProvider>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ProductProvider>
    </UserProvider>
  )
}

export default App
