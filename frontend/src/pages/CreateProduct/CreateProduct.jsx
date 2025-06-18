import { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { userContext } from '../../components/Context/userContext'
import { URLBASE } from '../../config/constants'
import './Createproduct.css'

const CreateProduct = () => {
  const { token } = useContext(userContext)

  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [stock, setStock] = useState('')
  const [type, setType] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nuevoProducto = {
      product,
      description,
      price: Number(price),
      image,
      stock: Number(stock),
      type,
      is_favorite: isFavorite
    }

    console.log('Body a enviar:', nuevoProducto)
    console.log('Token a enviar:', token)

    try {
      const response = await fetch(`${URLBASE}/inventario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nuevoProducto)
      })

      console.log('Status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Respuesta del server (error):', errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log('Respuesta exitosa:', data)

      Swal.fire({
        icon: 'success',
        title: 'Producto creado',
        text: data.mensaje
      })

      setProduct('')
      setPrice('')
      setDescription('')
      setImage('')
      setStock('')
      setType('')
      setIsFavorite(false)
    } catch (error) {
      console.error('Error al enviar:', error)
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
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Precio</label>
          <input
            type='number'
            className='form-control'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Descripción</label>
          <textarea
            className='form-control'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label>URL de la Imagen</label>
          <input
            type='url'
            className='form-control'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label>Stock</label>
          <input
            type='number'
            className='form-control'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='categoria'>Categoría</label>
          <select
            id='categoria'
            className='form-control'
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value=''>Selecciona una categoría</option>
            <option value='pantalon'>Pantalón</option>
            <option value='polera'>Polera</option>
            <option value='chaqueta'>Chaqueta</option>
            <option value='otra'>Otra</option>
          </select>
        </div>

        <div className='form-check mb-3'>
          <input
            className='form-check-input'
            type='checkbox'
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
            id='favoriteCheck'
          />
          <label className='form-check-label' htmlFor='favoriteCheck'>
            Marcar como favorito
          </label>
        </div>
        <button type='submit' className='btn btn-secondary m-5' style={{ backgroundColor: '#50657c' }}>
          Crear Producto
        </button>
      </form>
    </div>
  )
}

export default CreateProduct
