import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // (recargar la página)

    
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    // autenticación )
    if (email === 'test@example.com' && password === 'password123') {
      alert('¡Inicio de sesión exitoso!');
      setError(''); 
      
    } else {
      setError('Correo o contraseña incorrectos.');
    }

  
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card p-4 shadow-lg rounded">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {/* Muestra el mensaje de error si existe */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Iniciar Sesión</button>
        </form>

        <p className="text-center mt-3">
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
        <p className="text-center">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
