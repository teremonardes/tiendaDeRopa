// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProductProvider from './components/Context/fetchContext'

import NavbarT from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import NotFound from './pages/NotFound/NotFound' 
import Footer from './components/Footer/Footer'
import Register from './pages/Register/Register';
import Galeria from './pages/Gallery/Gallery'



import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


function App() {


  return (
  <BrowserRouter>
  <ProductProvider>
  <Header />
  <NavbarT />
  <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/cart" element={<Cart />} />
     {/* path='gallery/:type/:id' */}
     <Route path="/register" element={<Register />} />
     <Route path="/gallery" element={<Galeria />} />
     <Route path="/:type" element={<Galeria />} />
     <Route path="*" element={<NotFound />} />

  </Routes>

<Footer />
</ProductProvider>
 </BrowserRouter>
  )
}

export default App
