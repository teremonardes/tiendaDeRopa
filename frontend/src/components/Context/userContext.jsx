import { createContext, useEffect, useState } from "react";
import { Alertas } from "../../Utilidades/validaUsers";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken ? (savedToken) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Credenciales inválidas.");

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      Alertas("Inicio de sesión exitoso.");
    } catch ( error ) {
      Alertas("Error al iniciar sesión", error);
    }
  };

  const registra = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Error al registrar usuario.");

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("email", JSON.stringify(email));
      Alertas("Registro exitoso.");
    } catch (error) {
      Alertas("Error al registrar usuario", error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    Alertas("Sesión cerrada.");
  };

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  return (
    <userContext.Provider value={{ token, login, registra, logout }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
