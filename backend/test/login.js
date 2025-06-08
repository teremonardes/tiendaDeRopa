import { faker } from '@faker-js/faker'
import jwt from 'jsonwebtoken'

const generateToken = () => {
  const email = faker.internet.email()
  const userId = 5
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

export { generateToken }
