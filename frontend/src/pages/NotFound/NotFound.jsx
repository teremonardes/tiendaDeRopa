import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1">404</h1>
      <h3 className="mb-3">Página no encontrada</h3>
      <p>La ruta que estás intentando visitar no existe.</p>
      <Link to="/" className="btn btn-outline-primary mt-4">
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound
