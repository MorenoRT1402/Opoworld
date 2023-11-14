import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route, /*Link,*/ redirect } from 'react-router-dom';

import '../css/app.css';
import '../css/base-clases.css'

import { PATHS } from '../constants';
import AvatarCreation from './Components/AvatarCreation';
import { LoggedUserContext } from '../context/LoggedUserContext';

const HomePage = lazy(() => import('./Pages/HomeScreen.jsx'));
const LoginPage = lazy(() => import('./Pages/LoginScreen.jsx'));
const RegisterPage = lazy(() => import('./Pages/RegisterScreen.jsx'));

function App() {
  const { user } = useContext(LoggedUserContext);

  /*
  const renderAuthenticatedPage = (component) => {
    return user ? component : <LoginPage />;
  };
  */

  const redirectIfLogged = (route) => {
    return user ? redirect({route}) : redirect('/login')
  }
  return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={PATHS.ROOT} render={redirectIfLogged('/home')} element={<HomePage />} />
            <Route path={PATHS.HOME} render={redirectIfLogged('/home')} element={<HomePage />} />
            <Route path={PATHS.LOGIN} element={<LoginPage />} />
            <Route path={PATHS.REGISTER} element={<RegisterPage />} />
            <Route path={PATHS.AVATAR_EDIT} element={<AvatarCreation/>} />
            <Route path='/avatars' element={<h1>Avatars</h1>} />
            <Route path='/users' element={<h1>Users</h1>} />
            <Route path='*' element={<h1>Not Found</h1>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}

export default App;

/* Links
        <Link to='/'>Autenticacion Auto</Link>
        <Link to='/home'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/avatars'>Avatars</Link>
        <Link to='/users'>Users</Link>
*/
