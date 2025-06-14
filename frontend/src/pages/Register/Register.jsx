import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { userContext } from '../../components/Context/userContext'

const RegisterForm = ({ onSuccess }) => {
  const { registra } = useContext(userContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const nombre = e.target.nombre.value
    const email = e.target.email.value
    const password = e.target.password.value

    registra(email, password, nombre)
    onSuccess()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Nombre</Form.Label>
        <Form.Control name='nombre' type='text' required />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control name='email' type='email' required />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control name='password' type='password' required />
      </Form.Group>
      <Button type='submit' className='w-100'>Registrarse</Button>
    </Form>
  )
}

export default RegisterForm
