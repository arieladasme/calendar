import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import { useAuthStore, useForm } from '../../hooks'
import { AuthLayout } from '../layout/AuthLayout'

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const RegisterPage = () => {
  const { startRegister } = useAuthStore()
  const {
    registerEmail,
    registerPassword,
    registerPassword2,
    registerName,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields)

  const registerSubmit = e => {
    e.preventDefault()
    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en registro', 'Contraseña no coinciden', 'error')
    }
    startRegister({ email: registerEmail, password: registerPassword, name: registerName })
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={registerSubmit}>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="registerName"
            value={registerName}
            onChange={onRegisterInputChange}
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="Correo"
            name="registerEmail"
            value={registerEmail}
            onChange={onRegisterInputChange}
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            name="registerPassword"
            value={registerPassword}
            onChange={onRegisterInputChange}
          />
        </div>

        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Repita la contraseña"
            name="registerPassword2"
            value={registerPassword2}
            onChange={onRegisterInputChange}
          />
        </div>

        <div className="form-group mb-2">
          <input type="submit" className="btnSubmit" value="Crear cuenta" />
        </div>

        <Typography sx={{ mr: 1 }}>Ya tienes cuenta ?</Typography>
        <Link component={RouterLink} color="inherit" to="/auth/login">
          Ingresar
        </Link>
      </form>
    </AuthLayout>
  )
}
