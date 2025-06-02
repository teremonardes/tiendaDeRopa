import { createContext, useState } from "react";
import { Alertas } from "../../Utilidades/validaUsers";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem("token")) || null;
  });

const [user, setUser] = useState(() => {
  return JSON.parse(localStorage.getItem("user")) || null;
});

  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(u => u.email === email && u.password === password);

    if (existingUser) {
      const fakeToken = `${email}-token`;
      setToken(fakeToken);
       setUser(existingUser);
      localStorage.setItem("token", JSON.stringify(fakeToken));
      localStorage.setItem("user", JSON.stringify(existingUser));
      Alertas("Inicio de sesión exitoso.");
    } else {
      Alertas("Credenciales incorrectas.");
    }
  };

  const registra = (email, password, nombre) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(u => u.email === email);

    if (existingUser) {
      Alertas("Ese email ya está registrado.");
      return;
    }

    const newUser = { email, password, nombre };
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const fakeToken = `${email}-token`;
    setToken(fakeToken);
    setUser(newUser);
    localStorage.setItem("token", JSON.stringify(fakeToken));
    localStorage.setItem("user", JSON.stringify(newUser));
    Alertas("Registro exitoso.");
  };

  const logout = () => {
    setToken(null);
      localStorage.removeItem("token");
  setUser(null);
    localStorage.removeItem("user");
    Alertas("Sesión cerrada.");
  };

  return (
    <userContext.Provider value={{ token, user, login, registra, logout }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;


// export const userContext = createContext();

// const UserProvider = ({ children }) => {
//   const [token, setToken] = useState(() => {
//     const savedToken = localStorage.getItem("token");
//     return savedToken ? (savedToken) : null;
//   });

//   const login = async (email, password) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) throw new Error("Credenciales inválidas.");

//       const data = await response.json();
//       setToken(data.token);
//       localStorage.setItem("token", JSON.stringify(data.token));
//       Alertas("Inicio de sesión exitoso.");
//     } catch ( error ) {
//       Alertas("Error al iniciar sesión", error);
//     }
//   };

//   const registra = async (email, password) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) throw new Error("Error al registrar usuario.");

//       const data = await response.json();
//       setToken(data.token);
//       localStorage.setItem("token", JSON.stringify(data.token));
//       localStorage.setItem("email", JSON.stringify(email));
//       Alertas("Registro exitoso.");
//     } catch (error) {
//       Alertas("Error al registrar usuario", error);
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//     Alertas("Sesión cerrada.");
//   };

//   useEffect(() => {
//     if (token !== null) {
//       localStorage.setItem("token", JSON.stringify(token));
//     }
//   }, [token]);

//   return (
//     <userContext.Provider value={{ token, login, registra, logout }}>
//       {children}
//     </userContext.Provider>
//   );
// };

// export default UserProvider;
