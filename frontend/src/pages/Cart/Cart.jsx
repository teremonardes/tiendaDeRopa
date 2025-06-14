import React, { useContext } from 'react'
import { CartContext } from '../../components/Context/cartContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    decreaseQuantity
  } = useContext(CartContext)
  const navigate = useNavigate()

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleClear = () => {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: 'Se eliminarán todos los productos del carrito',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart()
        Swal.fire('Listo', 'El carrito está vacío', 'success')
      }
    })
  }

  if (cart.length === 0) {
    return (
      <div className='container mt-5 text-center'>
        <h2>Tu carrito está vacío 🛒</h2>
      </div>
    )
  }

  return (
    <div className='container mt-5 w-100'>
      <h2>Carrito de compras</h2>

      <table className='table table-hover mt-4'>
        <thead className='table-light'>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <div className='d-flex align-items-center gap-2'>
                  <button
                    className='btn btn-sm btn-outline-secondary'
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>

                  <button
                    className='btn btn-sm btn-outline-secondary'
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: item.price
                      })}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => removeFromCart(item.id)}
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='text-end'>
        <h4>Total: ${total}</h4>
        <button className='btn btn-secondary me-2' onClick={handleClear}>
          Vaciar carrito
        </button>
        <button className='btn btn-success' onClick={() => navigate('/checkout')}>
          Finalizar compra
        </button>
      </div>
    </div>
  )
}

export default Cart
