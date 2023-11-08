import { lazy } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import '../css/App.css'

const HomePage = lazy(() => import('./Pages/HomeScreen.jsx'))
const LoginPage = lazy(() => import('./Pages/LoginScreen.jsx'))
const RegisterPage = lazy(() => import('./Pages/RegisterScreen.jsx'))

function App() {
  console.log('ey')
  return (
    <main>
      <BrowserRouter>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/avatars'>Avatars</Link>
        <Link to='/users'>Users</Link>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/avatars' element={<h1>Avatars</h1> } />
          <Route path='/users' element={<h1>Users</h1>} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App