import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import { userContext } from '../../components/Context/userContext';
import productosData from '../../../public/data/productos.json'
import CardProduct from '../../components/Card/Card'

const MisProductos = () => {
//   const { token } = useContext(userContext);
  const [usuario, setUsuario] = useState(null);
  const [productosAMostrar, setProductosAMostrar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      alert('Debes iniciar sesión para ver tus productos.');
      navigate('/');
    } else {
      setUsuario(userData);
            const filtrados = productosData.filter(
        (producto) => producto.userId === userData.email
      );
      setProductosAMostrar(filtrados);
    }
  }, [navigate]);

  return (
    <div className="container m-4">
      <h2 className="mb-4 text-capitalize">
        Mis productos
      </h2>
      <div className="row">
        {productosAMostrar.length > 0 ? (
          productosAMostrar.map((product) => (
            <div className="col-12 col-md-4 mb-4" key={product.id}>
              <CardProduct
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                image={product.image}
                type={product.type}
                is_favorite={product.is_favorite}
                modoEdicion={true}
              />
                    
            </div>
            
          ))
        ) : (
          <p>No hay productos para mostrar.</p>
        )}
      </div>
      <button
     className="btn btn-secondary m-4" style={{ backgroundColor: '#50657c', position: 'fixed', bottom: '10px',  right: '10px', }}
        onClick={() => navigate('/create-product')}
       
      >
       Agregar producto
      </button>
    </div>
  );
};

export default MisProductos;
