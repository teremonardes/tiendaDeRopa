import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../components/Context/fetchContext'
import CardProduct from '../../components/Card/Card'

const Galeria = () => {
  const { type } = useParams()
  const { products } = useContext(ProductContext)

  const productosAMostrar = type
    ? products.filter((p) => p.type === type)
    : products

  return (
    <div className='container m-4'>
      <h2 className='mb-4 text-capitalize'>
        {type ? `Categoría: ${type}` : 'Todos los productos'}
      </h2>
      <div className='row'>
        {productosAMostrar.length > 0
          ? (
              productosAMostrar.map((product) => (
                <div className='col-12 col-md-4 mb-4' key={product.id_product}>
                  <CardProduct
                    id_product={product.id_product} // <-- así
                    product={product.product}
                    price={product.price}
                    description={product.description}
                    image={product.image}
                    type={product.type}
                    is_favorite={product.is_favorite}
                  />
                </div>
              ))
            )
          : (
            <p>No hay productos para mostrar.</p>
            )}
      </div>
    </div>
  )
}

export default Galeria
