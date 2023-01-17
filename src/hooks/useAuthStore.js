import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../api/calendarApi'
import { onChecking, onLogin, onLogout, clearErrorMessage } from '../store'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking()) // status in 'checking'

    try {
      // Login success
      const { data } = await calendarApi.post('/auth', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime()) // 23123123
      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (err) {
      dispatch(onLogout('Credenciales incorrectas'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  return {
    // propiedades
    status,
    user,
    errorMessage,
    // metodos
    startLogin,
  }
}
