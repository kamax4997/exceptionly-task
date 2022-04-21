import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from 'app/store'

export interface IInitialState {
  isAuthenticated: boolean
  accessToken: string
}

const initialState: IInitialState = {
  isAuthenticated: false,
  accessToken: '',
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // INITIALIZE
    getInitialize(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated
      state.accessToken = ''
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true
      state.accessToken = action.payload.accessToken
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false
      state.accessToken = ''
    },
  },
})

// Reducer
export default slice.reducer

const isValidKey = (accessToken: string) => {
  if (!accessToken || accessToken.length === 0) {
    return false
  }

  return true
}

const setSession = (accessToken: string) => {
  if (accessToken && accessToken.length > 0) {
    localStorage.setItem('accessToken', accessToken)
  } else {
    localStorage.removeItem('accessToken')
  }
}

export function login(accessToken: string) {
  return async (dispatch: AppDispatch) => {
    setSession(accessToken)

    dispatch(slice.actions.loginSuccess({ accessToken }))

    return true
  }
}

export function logout() {
  return async (dispatch: AppDispatch) => {
    setSession('')

    dispatch(slice.actions.logoutSuccess())
    return true
  }
}

export function getInitialize() {
  return async (dispatch: AppDispatch) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken && isValidKey(accessToken)) {
        setSession(accessToken)
        dispatch(slice.actions.loginSuccess({ accessToken }))
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            accessToken: '',
          })
        )
      }
    } catch (error) {
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          accessToken: '',
        })
      )
    }
  }
}
