// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
<<<<<<< HEAD
import ProductProvider from './components/Context/fetchContext'
=======
>>>>>>> 7750dfa (login)

import NavbarT from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import NotFound from './pages/NotFound/NotFound' 
import Footer from './components/Footer/Footer'
<<<<<<< HEAD
=======
import Login from './pages/Login/Login.jsx';
>>>>>>> 7750dfa (login)



import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


function App() {


  return (
  <BrowserRouter>
<<<<<<< HEAD
  <ProductProvider>
=======
>>>>>>> 7750dfa (login)
  <Header />
  <NavbarT />
  <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/cart" element={<Cart />} />
     {/* path='gallery/:product/:id' */}
<<<<<<< HEAD
=======
     <Route path="/login" element={<Login />} />
>>>>>>> 7750dfa (login)
     <Route path="*" element={<NotFound />} />

  </Routes>

<Footer />
<<<<<<< HEAD
</ProductProvider>
=======
>>>>>>> 7750dfa (login)
 </BrowserRouter>
  )
}

export default App
