import React, { useContext } from 'react'
import { CartContext } from '../../components/Context/cartContext'

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext)

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Tu carrito está vacío 🛒</h2>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <h2>Carrito de compras</h2>

      <table className="table table-hover mt-4">
        <thead className="table-light">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end">
        <h4>Total: ${total}</h4>
      </div>
    </div>
  )
}

export default Cart
