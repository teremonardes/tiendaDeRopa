import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Alertas } from '../../Utilidades/validaUsers'
import { URLBASE } from '../../config/constants.js'

const EditarProducto = () => {
  const { id_product } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    product: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    type: '',
    is_favorite: false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${URLBASE}/inventario/${id_product}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!res.ok) {
          throw new Error('No se pudo obtener el producto')
        }

        const data = await res.json()
        setForm(data)
        setLoading(false)
      } catch (error) {
        Alertas(`Error: ${error.message}`)
        navigate('/products/me')
      }
    }

    fetchProducto()
  }, [id_product, navigate])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    if (!token) {
      Alertas('Debes iniciar sesión')
      return
    }

    try {
      const response = await fetch(`${URLBASE}/inventario/${id_product}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al actualizar el producto')
      }

      Alertas('Producto actualizado exitosamente')
      navigate('/products/me')
    } catch (error) {
      console.error('Error al actualizar producto:', error.message)
      Alertas(error.message)
    }
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?')
    if (!confirmDelete) return

    const token = localStorage.getItem('token')
    if (!token) {
      Alertas('Debes iniciar sesión')
      return
    }

    try {
      const response = await fetch(`${URLBASE}/products/${id_product}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al eliminar el producto')
      }

      Alertas('Producto eliminado exitosamente')
      navigate('/products/me')
    } catch (error) {
      console.error('Error al eliminar producto:', error.message)
      Alertas(error.message)
    }
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div className='container mt-5'>
      <h2>Editar producto</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Nombre</label>
          <input type='text' name='product' className='form-control' value={form.product} onChange={handleChange} required />
        </div>

        <div className='form-group'>
          <label>Descripción</label>
          <textarea name='description' className='form-control' value={form.description} onChange={handleChange} required />
        </div>

        <div className='form-group'>
          <label>Precio</label>
          <input type='number' name='price' className='form-control' value={form.price} onChange={handleChange} required />
        </div>

        <div className='form-group'>
          <label>Imagen (URL)</label>
          <input type='text' name='image' className='form-control' value={form.image} onChange={handleChange} required />
        </div>

        <div className='form-group'>
          <label>Stock</label>
          <input type='number' name='stock' className='form-control' value={form.stock} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor='categoria'>Categoría</label>
          <select
            id='categoria'
            className='form-control'
            value={
      ['pantalon', 'polera', 'chaqueta'].includes(form.type)
        ? form.type
        : 'otra'
    }
            onChange={(e) => {
              const value = e.target.value
              setForm((prev) => ({
                ...prev,
                type: value === 'otra' ? '' : value
              }))
            }}
            required
          >
            <option value=''>Selecciona una categoría</option>
            <option value='pantalon'>Pantalón</option>
            <option value='polera'>Polera</option>
            <option value='chaqueta'>Chaqueta</option>
            <option value='otra'>Otra</option>
          </select>
        </div>

        {!['pantalon', 'polera', 'chaqueta'].includes(form.type) && (
          <div className='form-group'>
            <label>Otra categoría</label>
            <input
              type='text'
              name='type'
              className='form-control'
              value={form.type}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className='form-group form-check mb-3'>
          <input type='checkbox' name='is_favorite' className='form-check-input' checked={form.is_favorite} onChange={handleChange} />
          <label className='form-check-label'>Favorito</label>
        </div>
        <div className='mb-3'>
          <button type='submit' className='btn btn-secondary m-3' style={{ backgroundColor: '#50657c' }}>
            Guardar Cambios
          </button>

          <button type='button' className='btn btn-danger m-3' onClick={handleDelete}>
            Eliminar Producto
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditarProducto
