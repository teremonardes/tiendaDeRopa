import { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { userContext } from '../../components/Context/userContext'
import { URLBASE } from '../../config/constants.js'
import './Createproduct.css'

const CreateProduct = () => {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen] = useState('')
  const [type, setType] = useState('')

  const { token } = useContext(userContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nuevoProducto = {
      product: nombre,
      price: Number(precio),
      description: descripcion,
      image: imagen,
      type
    }

    try {
      console.log('Token:', token)

      const response = await fetch(`${URLBASE}/inventario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nuevoProducto)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al crear el producto')
      }

      Swal.fire({
        icon: 'success',
        title: 'Producto creado correctamente',
        timer: 2000,
        showConfirmButton: false
      })

      // Limpiar los campos
      setNombre('')
      setPrecio('')
      setDescripcion('')
      setImagen('')
      setType('')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      })
    }
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label>Nombre del Producto</label>
          <input
            type='text'
            className='form-control'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Precio</label>
          <input
            type='number'
            className='form-control'
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Descripción</label>
          <textarea
            className='form-control'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Imagen (URL)</label>
          <input
            type='text'
            className='form-control'
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label>Categoría</label>
          <input
            type='text'
            className='form-control'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-secondary m-5' style={{ backgroundColor: '#50657c' }}>
          Crear Producto
        </button>
      </form>
    </div>
  )
}

export default CreateProduct
