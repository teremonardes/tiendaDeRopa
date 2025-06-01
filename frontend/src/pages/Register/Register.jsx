import React, { useState } from 'react';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoUsuario = { nombre, email, password };
    setUsuarios([...usuarios, nuevoUsuario]);
    alert('Registro exitoso!');
    setNombre('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
