import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../api/calendarApi'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }) => {
    try {
      const resp = await calendarApi.post('/auth', { email, password })
      console.log(resp)
    } catch (err) {
      console.log(err)
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
