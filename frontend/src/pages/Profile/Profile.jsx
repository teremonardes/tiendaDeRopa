import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      alert('Debes iniciar sesión para ver tu perfil');
      navigate('/');
    } else {
      setUsuario(userData);
    }
  }, [navigate]);

  if (!usuario) {
    return (
      <div className="container mt-5 text-center">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mi Perfil</h2>
      <div className="card p-4 shadow perfil-card">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Contraseña:</strong> {usuario.password}</p>
        <button className="btn btn-light mt-3" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
