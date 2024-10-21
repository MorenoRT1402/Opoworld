import React, { useContext, useEffect, useState } from "react";
import { useField } from "../../Hooks/useField";
import { Link, useNavigate } from 'react-router-dom';
import { LoggedUserContext } from "../../context/LoggedUserContext";
import { PATHS } from "../../constants";
import { useRedirect } from "../../Hooks/useRedirect";
import useError from "../../Hooks/useError";
import userServices from '../../services/users'

export default function LoginScreen() {
  const navigate = useNavigate();
  const email = useField({ type: 'text' }).field;
  const password = useField({ type: 'password' }).field;
  const { login } = useContext(LoggedUserContext);
  const { errorMessage, errorStyle, setErrorMessage } = useError('');
  useRedirect();

  const [guestUser, setGuestUser] = useState(null);

  const fetchGuestUser = async () => {
    try {
      const user = await userServices.getGuest();
      setGuestUser(user.data);
    } catch (error) {
      console.error('Error fetching guest user:', error);
    }
  };

  useEffect(() => {
    fetchGuestUser();
  }, []);

  const loginUserWithParams = async (ev) => {
    ev.preventDefault();

    try {
      await login({ email: email.value, password: password.value });
      navigate('/home');
    } catch (error) {
      console.log("Wrong credentials");
      console.error(error.message);
      setErrorMessage('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <React.Fragment>
      <main>
        <strong className="title">OpoWorld</strong>
        <form onSubmit={loginUserWithParams}>
          <input name="email" placeholder="Email" {...email} />
          <input name="password" placeholder="Password" {...password} />
          {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
          <button>Iniciar sesión</button>
          <div className="grid horizontal" style={{ minWidth: "140px" }}>
            <p>o también puedes</p>
            <Link to={PATHS.REGISTER} className="hcenter vcenter" style={{ color: "white" }}>
              Registrarte
            </Link>
          </div>
        </form>

        {guestUser ?
          <div className="guest-user-box" style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <h4>Usuario Invitado</h4>
            <p><strong>Email:</strong> {guestUser.email}</p>
            <p><strong>Contraseña:</strong> {guestUser.password}</p>
            <p>Usa las credenciales anteriores para iniciar sesión como invitado.</p>
          </div>
        : null
        }
      </main>
    </React.Fragment>
  );
}
