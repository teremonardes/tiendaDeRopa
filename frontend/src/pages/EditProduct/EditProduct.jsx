import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productosData from '../../../public/data/productos.json';
import { Alertas } from '../../Utilidades/validaUsers'

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    quantity: '',
    type: '',
  });

  useEffect(() => {
    const productoExistente = productosData.find(p => p.id === parseInt(id));
    if (productoExistente) {
      setProducto(productoExistente);
      setForm({ ...productoExistente });
    } else {
      Alertas('Producto no encontrado');
      navigate('/mis-productos');
    }
  }, [id, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // No podemos guardar en JSON directamente, solo mostrar alerta o simular
    console.log('Producto actualizado (simulado):', form);
    Alertas('Producto actualizado (solo simulado, JSON no puede modificarse directamente)');
    navigate('/mis-productos');
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="container mt-5">
      <h2>Editar producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea name="description" className="form-control" value={form.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Precio</label>
          <input type="number" name="price" className="form-control" value={form.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Imagen (URL)</label>
          <input type="text" name="image" className="form-control" value={form.image} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Cantidad</label>
          <input type="number" name="quantity" className="form-control" value={form.quantity} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <input type="text" name="type" className="form-control" value={form.type} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-secondary m-5" style={{ backgroundColor: '#50657c'}}>Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
