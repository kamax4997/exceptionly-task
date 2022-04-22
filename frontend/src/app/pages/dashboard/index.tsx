import React from 'react'
import useAuth from 'app/hooks/useAuth'
import { Button, Typography } from '@mui/material'
import { useGoogleLogout } from 'react-google-login'

const Dashboard: React.FC = () => {
  const { logout } = useAuth()
  const { signOut, loaded } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || ''
  })

  const handleLogout = () => {
    logout()
    signOut()
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <Typography variant="h3">Exceptionly</Typography>
        <Button type="button" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
