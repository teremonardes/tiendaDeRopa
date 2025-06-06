import pkg from 'pg'
import 'dotenv/config'
const { Pool } = pkg

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  allowExitOnIdle: true
})

export const obtenerDB = async () => {
  try {
    const result = await db.query('SELECT current_database()')
    console.log(
      `✅ Conectado a la base de datos: ${result.rows[0].current_database}`
    )
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message)
  }
}

export default db

