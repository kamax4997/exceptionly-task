import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import dashboardReducer from './slices/dashboard'
import authReducer from './slices/auth'

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings'],
}

const dashboardPersistConfig = {
  key: 'dashboard',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['dashboardData'],
}

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authData'],
}

const rootReducer = combineReducers({
  dashboard: persistReducer(dashboardPersistConfig, dashboardReducer),
  auth: persistReducer(authPersistConfig, authReducer),
})

export { rootPersistConfig, rootReducer }
