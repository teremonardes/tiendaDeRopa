import request from 'supertest'
import app from '../server.js'
import { generateToken } from './login.js'

describe('CRUD operations for inventory items', () => {
  let token

  beforeAll(() => {
    token = generateToken()
  })
  test('GET /api/inventario should return all items', async () => {
    const response = await request(app).get('/api/inventario')
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body.inventario)).toBe(true)
  })

  test('GET /api/inventario/:id_product should return a single item', async () => {
    const response = await request(app).get('/api/inventario/3')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id_product', 3)
  })

  test('GET /api/inventario/:id_product with non-existent ID should return 404', async () => {
    const response = await request(app).get('/api/inventario/99999')
    expect(response.statusCode).toBe(404)
  })

  test('POST /api/inventario should create a new item', async () => {
    const nuevoProducto = {
      product: 'Test polera',
      description: 'Test description',
      price: 9990,
      image: 'https://example.com/image.jpg',
      stock: 15,
      type: 'polera',
      is_favorite: false
    }
    const response = await request(app).post('/api/inventario').send(nuevoProducto)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(201)
    expect(response.body.mensaje).toMatch('Producto agregado correctamente')
  })
})
