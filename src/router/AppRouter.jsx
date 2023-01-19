import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Grid, CircularProgress } from '@mui/material'
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
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
      >
        <Grid item justifyContent="center">
          <CircularProgress color="info" />
        </Grid>
      </Grid>
    )
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
