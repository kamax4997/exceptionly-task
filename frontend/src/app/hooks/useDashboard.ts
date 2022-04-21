import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'app/store'
import { setUser, IUser } from 'app/store/slices/dashboard'

const useDashboard = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state: IRootState) => state.dashboard)

  return {
    user,

    setUser: (params: IUser) => dispatch(setUser(params)),
  }
}

export default useDashboard
