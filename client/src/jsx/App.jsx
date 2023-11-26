import { lazy, Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, /*Link,*/ redirect } from 'react-router-dom';

import '../css/app.css';
import '../css/base-clases.css'
import '../css/components.css'

import { PATHS } from '../constants';
import AvatarCreation from './Components/AvatarCreation';
import { LoggedUserContext } from '../context/LoggedUserContext';
import { AvatarProvider } from '../context/AvatarContext';
import { BattleProvider } from '../context/BattleContext.jsx';

const HomePage = lazy(() => import('./Pages/HomeScreen.jsx'));
const LoginPage = lazy(() => import('./Pages/LoginScreen.jsx'));
const RegisterPage = lazy(() => import('./Pages/RegisterScreen.jsx'));
const QuestionPage = lazy(() => import ('./Pages/QuestionCreation.jsx'))
const BattlePage = lazy(() => import('./Pages/BattlePage.jsx'))

function App() {
  const { user } = useContext(LoggedUserContext);

  useEffect(() => {
    console.log('follow 24', user)
    redirectIfLogged('/home')
  }, [user])

  /*
  const renderAuthenticatedPage = (component) => {
    return user ? component : <LoginPage />;
  };
  */

  const redirectIfLogged = (route) => {
    return user!=null ? redirect({route}) : redirect('/login')
  }

  return (
    <AvatarProvider>
      <BattleProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path={PATHS.ROOT} render={redirectIfLogged('/home')} element={<HomePage />} />
              <Route path={PATHS.HOME} render={redirectIfLogged('/home')} element={<HomePage />} />
              <Route path={PATHS.LOGIN} render={redirectIfLogged('/home')} element={<LoginPage />} />
              <Route path={PATHS.REGISTER} element={<RegisterPage />} />
              <Route path={`${PATHS.AVATAR_EDIT}/:id?`} element={<AvatarCreation />} />
              <Route path={PATHS.QUESTION_CREATION} element={<QuestionPage />} />
              <Route path={PATHS.BATTLE} element={<BattlePage />} />
              <Route path='/users' element={<h1>Users</h1>} />
              <Route path='*' element={<h1>Not Found</h1>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </BattleProvider>
    </AvatarProvider>
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
