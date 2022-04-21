import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Loading from 'app/@core/loading'

const PrivateRoutes: React.FC = () => {
  const DashboardWrapper = lazy(() => import('app/pages/dashboard'))

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/dashboard" exact component={DashboardWrapper} />
        <Redirect from="/" to="/dashboard" />
        <Redirect exact from="/" to="/dashboard" />
        <Redirect to="dashboard" />
      </Switch>
    </Suspense>
  )
}

export default PrivateRoutes
