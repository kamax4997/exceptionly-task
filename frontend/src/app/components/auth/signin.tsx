import React from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import axiosInstance from 'app/services/axiosService'
import { refreshTokenSetup } from '../../utils/refreshToken'
import { useGoogleLogin } from 'react-google-login'
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Link,
} from '@mui/material'
import { LinkedIn, Google, Dashboard } from '@mui/icons-material'
import useAuth from 'app/hooks/useAuth'
import { toast } from 'react-toastify'

interface IFormInputs {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch()
  const { login } = useAuth()

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Must be a valid email'),
    password: Yup.string()
      .required('Password is mendatory')
      .min(3, 'Password must be at 3 char long'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>(formOptions)
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const result = await axiosInstance.post('login', data)
    if (result.data.accessToken) {
      toast.success('Login Success!')
      dispatch(login(result.data.accessToken))
    } else {
      toast.error(result.data.message ? result.data.message : 'Login Failed!')
    }
  }

  const onSuccess = async (res: any) => {
    console.log('Login Success: currentUser:', res)
    if (res.profileObj.email) {
      toast.success('Login Success! 😍')
      await dispatch(login(res.accessToken))
    } else {
      toast.error('Login Failed!')
    }
    
    refreshTokenSetup(res)
  }

  const onFailure = (res: any) => {
    console.log('Login failed: res:', res)
    alert(
      `Failed to login. 😢`
    )
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    isSignedIn: true,
    accessType: 'offline',
  })

  return (
    <Box className="auth__vertical-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="auth__signIn__form"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          autoComplete="email"
          variant="standard"
          error={errors.email ? true : false}
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          sx={{ marginBottom: '0px', transition: 'all 0.25s' }}
          {...register('email')}
        />
        <div className="auth__invalid-feedback">{errors.email?.message}</div>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          id="password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          sx={{ marginBottom: '0px', transition: 'all 0.25s' }}
          error={errors.password ? true : false}
          {...register('password')}
        />
        <div className="auth__invalid-feedback">{errors.password?.message}</div>
        <Grid container className="auth__signin-forget-remember">
          <Grid item xs>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={<span style={{ fontSize: '14px' }}>{'Remember me'}</span>}
            />
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" sx={{ fontSize: '14px' }}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="auth__button"
        >
          SIGN IN
        </Button>
      </form>
      <Typography
        sx={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}
      >
        OR
      </Typography>
      <Box className="auth__signIn-actions">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="auth__button"
          onClick={signIn}
        >
          <Google sx={{ marginRight: '8px' }} />
          SIGN IN WITH GOOGLE
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="auth__button"
          sx={{ backgroundColor: '#2867B2 !important' }}
        >
          <LinkedIn sx={{ marginRight: '8px' }} />
          SIGN IN WITH LINKDIN
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="auth__button"
          sx={{ backgroundColor: '#f25022 !important' }}
        >
          <Dashboard sx={{ marginRight: '8px' }} />
          SIGN IN WITH MICROSOFT
        </Button>
      </Box>
    </Box>
  )
}

export default SignIn
