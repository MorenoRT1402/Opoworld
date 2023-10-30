import { Suspense, lazy } from 'react'

import '../css/App.css'
import { Router } from './Navigation/Router.jsx'
import { Route } from './Navigation/Route.jsx'
import SearchPage from './Pages/SearchPage.jsx'

const LoginPage = lazy(() => import('./Pages/LoginScreen.jsx'))
const RegisterPage = lazy(() => import('./Pages/RegisterScreen.jsx'))
const HomePage = lazy(() => import('./Pages/HomeScreen.jsx'))

const appRoutes = [
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
      <Router routes = {appRoutes} defaultComponent={<h1>ERROR 404</h1>}>
        <Route path='/' Component={LoginPage} />
        <Route path='/register' Component={RegisterPage} />
        <Route path='/home' Component={HomePage} />
      </Router>
      </Suspense>
    </main>
  )
}

export default App
