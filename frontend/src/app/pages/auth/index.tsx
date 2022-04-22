import React, { useState } from 'react'
import SignIn from 'app/components/auth/signin'
import SignUp from 'app/components/auth/signup'
import RightLogo from 'assets/images/Right_logo.svg'
import DotLogo from 'assets/images/Dot_Logo.svg'
import { Box, Typography } from '@mui/material'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const toggleIsLogin = () => {
    setIsLogin((prev) => !prev)
  }

  return (
    <Box className="auth">
      <Box className="auth__container">
        <Box className="auth__leftSide">
          <Box className="auth__leftSide__logo">
            <img
              src={`${DotLogo}`}
              alt="dot logo"
              loading="lazy"
              className="auth__leftSide__logo-img"
            />
          </Box>
          <Box className="auth__leftSide__bottom">
            <Typography className="auth__leftSide__bottom-subtitle">
              WELCOME TO THE MARKETPLACE
            </Typography>
            <Typography className="auth__leftSide__bottom-description">
              Exceptionly provides hands-on tested remote software engineers
              unlike any other outsourcing company. Our product delivers talent
              directly for hiring without a lifetime markup over 400%.
            </Typography>
          </Box>
        </Box>
        <Box className="auth__rightSide" style={isLogin? {minHeight: '74vh'} : {minHeight: '90vh'}}>
          <Box className="auth_rightSide_top">
            <Box className="auth__rightSide__logo">
              <img
                src={`${RightLogo}`}
                alt="right logo"
                loading="lazy"
                className="auth__rightSide__logo-img"
              />
              <Typography className="auth__rightSide__title">
                {isLogin
                  ? 'Sign in to your account'
                  : 'Sign up to your account'}
              </Typography>
            </Box>
            {isLogin ? <SignIn /> : <SignUp toggle={toggleIsLogin} />}
          </Box>
          <Box className="auth__rightSide__bottom">
            {isLogin ? `Don't have an account?` : 'Already have an account?'}
            <Typography
              className="auth__rightSide__bottom-title"
              onClick={() => toggleIsLogin()}
            >
              {isLogin ? 'CREATE AN ACCOUNT' : 'SIGN IN HERE'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Auth
