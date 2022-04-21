import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'app/store'
import { login, logout } from 'app/store/slices/auth'

const useAuth = () => {
  const dispatch = useDispatch()

  const { isAuthenticated, accessToken } = useSelector(
    (state: IRootState) => state.auth
  )

  return {
    isAuthenticated,
    accessToken,

    login: (accessToken: string) => dispatch(login(accessToken)),
    logout: () => dispatch(logout()),
  }
}

export default useAuth
