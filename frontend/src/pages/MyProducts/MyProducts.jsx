import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardProduct from '../../components/Card/Card'
import { URLBASE } from '../../config/constants'

const MisProductos = () => {
  const [usuario, setUsuario] = useState(null)
  const [productosAMostrar, setProductosAMostrar] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    if (!userData || !token) {
      alert('Debes iniciar sesión para ver tus productos.')
      navigate('/')
      return
    }

    setUsuario(userData)

    const fetchMisProductos = async () => {
      try {
        const response = await fetch(`${URLBASE}/products/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`Error ${response.status}: ${errorData.error || 'No se pudieron obtener los productos'}`)
        }

        const data = await response.json()
        setProductosAMostrar(data.inventario)
      } catch (error) {
        console.error('Error al obtener productos:', error.message)
        alert(error.message)
      }
    }

    fetchMisProductos()
  }, [navigate])

  return (
    <div className='container m-4'>
      <h2 className='mb-4 text-capitalize'>
        Mis productos
      </h2>
      <div className='row'>
        {productosAMostrar.length > 0
          ? (
              productosAMostrar.map((product) => (
                <div className='col-12 col-md-4 mb-4' key={product.id_product}>
                  <CardProduct
                    id_product={product.id_product}
                    product={product.product}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                    type={product.type}
                    stock={product.stock}
                    is_favorite={product.is_favorite}
                    modoEdicion
                  />

                </div>
              ))
            )
          : (
            <p>No hay productos para mostrar.</p>
            )}
      </div>
      <button
        className='btn btn-secondary m-4'
        style={{ backgroundColor: '#50657c', position: 'fixed', bottom: '10px', right: '10px' }}
        onClick={() => navigate('/create-product')}
      >
        Agregar producto
      </button>
    </div>
  )
}

export default MisProductos
