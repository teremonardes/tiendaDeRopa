import { useState } from 'react';
import './Createproduct.css';

const CreateProduct = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      nombre,
      precio,
      descripcion,
    };
    console.log('Nuevo producto:', nuevoProducto);
    alert('Producto creado correctamente');
 
    setNombre('');
    setPrecio('');
    setDescripcion('');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input
            type="number"
            className="form-control"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn custom-btn w-100">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
