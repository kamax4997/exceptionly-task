import React from 'react'
import useAuth from 'app/hooks/useAuth'
import { Button, Typography } from '@mui/material'

const Dashboard: React.FC = () => {
  const { logout } = useAuth()

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <Typography variant="h3">Exceptionly</Typography>
        <Button type="button" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
