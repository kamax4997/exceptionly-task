import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { createBrowserHistory } from 'history'
import JwtProvider from 'app/components/auth/JwtProvider'
import PublicRoutes from 'app/routes/PublicRoutes'
import PrivateRoutes from 'app/routes/PrivateRoutes'
import { IRootState } from 'app/store'
import 'react-toastify/dist/ReactToastify.css'

const history = createBrowserHistory()

const App: React.FC = () => {
  const isAuthenticated = useSelector<IRootState>(
    ({ auth }) => auth.isAuthenticated,
    shallowEqual
  )

  return (
    <Router history={history}>
      <JwtProvider>
        <BrowserRouter>
          <Switch>
            {!isAuthenticated ? (
              <Route>
                <PublicRoutes />
              </Route>
            ) : (
              <Route>
                <PrivateRoutes />
              </Route>
            )}
          </Switch>
        </BrowserRouter>
        <ToastContainer />
      </JwtProvider>
    </Router>
  )
}

export default App
