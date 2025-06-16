import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { userContext } from '../../components/Context/userContext'

const RegisterForm = ({ onSuccess }) => {
  const { registra } = useContext(userContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    const nombre = e.target.nombre.value
    const apellido = e.target.apellido.value
    const mail = e.target.email.value
    const pass = e.target.password.value
    const telefono = e.target.telefono.value
    const direccion = e.target.direccion.value

    registra({ nombre, apellido, mail, pass, telefono, direccion })
    onSuccess()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Nombre</Form.Label>
        <Form.Control name='nombre' type='text' required />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Apellido</Form.Label>
        <Form.Control name='apellido' type='text' required />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control name='email' type='email' required />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control name='password' type='password' required />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control name='telefono' type='text' required />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Dirección</Form.Label>
        <Form.Control name='direccion' type='text' required />
      </Form.Group>
      <Button type='submit' className='w-100'>Registrarse</Button>
    </Form>

  )
}

export default RegisterForm
