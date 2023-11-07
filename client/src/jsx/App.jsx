import { Suspense, lazy } from 'react'

import '../css/App.css'
/*
import { Router } from './Navigation/Router.jsx'
import { Route } from './Navigation/Route.jsx'
import SearchPage from './Pages/SearchPage.jsx'
import NotFound from './Pages/NotFound'
*/
const LoginPage = lazy(() => import('./Pages/LoginScreen.jsx'))
/*
const RegisterPage = lazy(() => import('./Pages/RegisterScreen.jsx'))
const HomePage = lazy(() => import('./Pages/HomeScreen.jsx'))
*/
/*
const appRoutes = [
  {
    path: '/search/:query',
    Component: SearchPage
  }
]
*/

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage/>
      </Suspense>
    </main>
  )
}

export default App

/*
      <Router routes = {appRoutes} defaultComponent={<NotFound/>}>
        <Route path='/' Component={LoginPage} />
        <Route path='/register' Component={RegisterPage} />
        <Route path='/home' Component={HomePage} />
      </Router>
      */
