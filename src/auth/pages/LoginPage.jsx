import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'
import Swal from 'sweetalert2'
import { useAuthStore, useForm } from '../../hooks'
import './LoginPage.css'
import { AuthLayout } from '../layout/AuthLayout'

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore()
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields)

  const loginSubmit = e => {
    e.preventDefault()
    startLogin({ email: loginEmail, password: loginPassword })
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <AuthLayout title="Ingreso">
      <form onSubmit={loginSubmit}>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Correo"
            name="loginEmail"
            value={loginEmail}
            onChange={onLoginInputChange}
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            name="loginPassword"
            value={loginPassword}
            onChange={onLoginInputChange}
          />
        </div>
        <div className="form-group mb-2">
          <input type="submit" className="btnSubmit" value="Login" />
        </div>

        <Link component={RouterLink} color="inherit" to="/auth/register">
          Crear una cuenta
        </Link>
      </form>
    </AuthLayout>
  )
}
