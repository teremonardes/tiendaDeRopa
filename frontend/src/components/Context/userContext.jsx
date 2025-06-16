import { createContext, useState } from 'react'
import { Alertas } from '../../Utilidades/validaUsers'
import axios from 'axios'
import { URLBASE } from '../../config/constants.js'

export const userContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null
  })
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null
  })

  const registra = async ({ nombre, apellido, mail, pass, telefono, direccion }) => {
    try {
      const { data } = await axios.post(`${URLBASE}/users/register`, {
        nombre, apellido, mail, pass, telefono, direccion
      })
      setUser(data.usuario)
      localStorage.setItem('user', JSON.stringify(data.usuario))
      Alertas(data.message || 'Registro exitoso')
      await login(mail, pass)
    } catch (error) {
      console.error('Error al registrar:', error)
      Alertas(error.response?.data?.error || 'Error del servidor')
    }
  }

  // Login
  const login = async (mail, pass) => {
    try {
      const { data } = await axios.post(`${URLBASE}/users/login`, { mail, pass })
      setToken(data.token)
      localStorage.setItem('token', data.token)
      await getProfile(data.token)
      Alertas(data.message || 'Login exitoso')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      Alertas(error.response?.data?.message || 'Error del servidor')
    }
  }

  // Obtener perfil usando token
  const getProfile = async (jwtToken = token) => {
    if (!jwtToken) return
    try {
      const { data } = await axios.get(`${URLBASE}/users/profile`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      setUser(data.usuario)
      localStorage.setItem('user', JSON.stringify(data.usuario))
    } catch (error) {
      console.error('Error al obtener perfil:', error)
      Alertas(error.response?.data?.error || 'Error al obtener perfil')
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    Alertas('Sesión cerrada')
  }

  return (
    <userContext.Provider value={{
      user, token, login, registra, logout, getProfile
    }}
    >
      {children}
    </userContext.Provider>
  )
}

export default UserProvider
