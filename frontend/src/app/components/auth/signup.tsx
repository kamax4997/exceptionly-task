import React, {ChangeEvent} from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Box, Typography, TextField, Button, Stack } from '@mui/material'
import { LinkedIn, Google, Dashboard } from '@mui/icons-material'
import axiosInstance from 'app/services/axiosService'

interface IFormInputs {
  firstName: string
  lastName: string
  email: string
  confirmEmail: string
  password: string
  confirmPwd: string
}

export interface ISignUp {
  toggle: () => void
}

const SignUp: React.FC<ISignUp> = (props: ISignUp) => {
  const { toggle } = props

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Must be a valid email'),
    confirmEmail: Yup.string()
      .required('Email is required')
      .email('Must be a valid email')
      .oneOf([Yup.ref('email')], 'Email does not match'),
    password: Yup.string()
      .required('Password is mendatory')
      .min(3, 'Password must be at 3 char long'),
    confirmPwd: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<IFormInputs>({ mode: 'onChange', resolver: yupResolver(formSchema) })

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const result = await axiosInstance.post('users', data)

    if (result.data.user) {
      toast.success('Sign up success!')
      toggle()
    }
  }

  return (
    <Box className="auth__vertical-center">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="auth__signUp__form"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="Name"
          autoComplete="name"
          variant="standard"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          error={errors.firstName ? true : false}
          sx={{ marginBottom: '0px' }}
          {...register('firstName')}
          onFocus={(e) => {
            if(!e.target.value)
              setError('firstName', {
                message: 'The Field is required'
              })
          }}
        />
        <div className="auth__invalid-feedback">
          {errors.firstName?.message}
        </div>
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          autoComplete="lastName"
          variant="standard"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          sx={{ marginBottom: '0px' }}
          error={errors.lastName ? true : false}
          {...register('lastName')}
          onFocus={(e) => {
            if(!e.target.value)
              setError('lastName', {
                message: 'The Field is required'
              })
          }}
        />
        <div className="auth__invalid-feedback">{errors.lastName?.message}</div>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          variant="standard"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          sx={{ marginBottom: '0px' }}
          error={errors.email ? true : false}
          {...register('email')}
          onFocus={(e) => {
            if(!e.target.value)
              setError('email', {
                message: 'The Field is required'
              })
          }}
        />
        <div className="auth__invalid-feedback">{errors.email?.message}</div>
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmEmail"
          label="Retype Email"
          type="email"
          autoComplete="confirmEmail"
          variant="standard"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          sx={{ marginBottom: '0px' }}
          error={errors.confirmEmail ? true : false}
          {...register('confirmEmail')}
          onFocus={(e) => {
            if(!e.target.value)
              setError('confirmEmail', {
                message: 'The Field is required'
              })
          }}
        />
        <div className="auth__invalid-feedback">
          {errors.confirmEmail?.message}
        </div>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          variant="standard"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          sx={{ marginBottom: '0px' }}
          error={errors.password ? true : false}
          {...register('password')}
          onFocus={(e) => {
            if(!e.target.value)
              setError('password', {
                message: 'The Field is required'
              })
          }}
        />
        <div className="auth__invalid-feedback">{errors.password?.message}</div>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Retype Password"
          type="password"
          id="confirmPwd"
          autoComplete="current-password"
          variant="standard"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
          sx={{ marginBottom: '0px' }}
          error={errors.confirmPwd ? true : false}
          {...register('confirmPwd')}
          onFocus={(e) => {
            if(!e.target.value)
              setError('confirmPwd', {
                message: 'The Field is required'
              })
          }}
        />
        <div className="auth__invalid-feedback">
          {errors.confirmPwd?.message}
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="auth__button"
          sx={{ marginTop: '43px !important' }}
        >
          SIGN UP
        </Button>
      </Box>
      <Typography
        sx={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}
      >
        OR SIGN UP USING
      </Typography>
      <Stack direction="row" spacing={2} className="auth__signUp-actions">
        <Button
          type="submit"
          variant="contained"
          className="auth__signup-button"
        >
          <Google />
        </Button>
        <Button
          type="submit"
          variant="contained"
          className="auth__signup-button-blue"
        >
          <LinkedIn />
        </Button>
        <Button
          type="submit"
          variant="contained"
          className="auth__signup-button-yellow"
        >
          <Dashboard />
        </Button>
      </Stack>
    </Box>
  )
}

export default SignUp
