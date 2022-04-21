import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from 'app/store'

export interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IInitialState {
  user: IUser
}

const initialState: IInitialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
}

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user
    },
  },
})

// Reducer
export default slice.reducer

export function setUser(user: IUser) {
  return async (dispatch: AppDispatch) => {
    dispatch(
      slice.actions.setUser({
        user,
      })
    )

    return true
  }
}
