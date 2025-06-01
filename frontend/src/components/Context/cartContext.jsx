import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

function CartProvider({ children }) {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [pizzas, setPizzas] = useState([]);
  const obtenerPizzas = async () => {
    const res = await fetch("http://localhost:5000/api/pizzas");
    const pizzaRespuesta = await res.json();
    setPizzas(pizzaRespuesta);
  };

  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    obtenerPizzas();
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex((carro) => carro.id === item.id);
    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].cantidad++;
      setCart(updatedCart);
    } else {
      item.cantidad = 1;
      setCart([...cart, item]);
    }
  }
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((carro) => carro.id !== id));
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.cantidad > 0) {
        return {
          ...item,
          cantidad: item.cantidad - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.cantidad >= 0) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart(e) {
    setCart([]);
  }

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        initialCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
export const useCart = () => {
  return useContext(cartContext);
};
export default CartProvider;
