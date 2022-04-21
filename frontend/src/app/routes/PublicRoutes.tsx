import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Auth from 'app/pages/auth'
import Loading from 'app/@core/loading'

const PublicRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" component={Auth} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  )
}

export default PublicRoutes
