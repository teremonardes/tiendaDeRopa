import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { userContext } from '../../components/Context/userContext'

const LoginForm = ({ onSuccess }) => {
  const { login } = useContext(userContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    login(email, password)
    onSuccess()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control name='email' type='email' required />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control name='password' type='password' required />
      </Form.Group>
      <Button type='submit' className='w-100'>Iniciar Sesión</Button>
    </Form>
  )
}

export default LoginForm
