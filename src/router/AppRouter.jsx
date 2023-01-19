import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../auth'
import { CalendarPage } from '../calendar'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore()
  //const authStatus = 'not-authenticated'

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return <h3>Cargandoooooo</h3>
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}

      {/* not necessary */}
    </Routes>
  )
}
