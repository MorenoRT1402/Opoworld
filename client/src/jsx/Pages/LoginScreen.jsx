import React, { useContext } from "react";
import { useField } from "../../Hooks/useField";
import { Link, useNavigate } from 'react-router-dom'
import { LoggedUserContext } from "../../context/LoggedUserContext";
import { PATHS } from "../../constants";
import { useRedirect } from "../../Hooks/useRedirect";
import useError from "../../Hooks/useError";
//import { Link } from "../Navigation/Link";

export default function LoginScreen() {
  const navigate = useNavigate()
  const email = useField({ type: 'text' }).field
  const password = useField({ type: 'password' }).field
  const { login } = useContext(LoggedUserContext);
  const { errorMessage, errorStyle, setErrorMessage } = useError('')
  useRedirect()

  const loginUserWithParams = async (ev) => {
    ev.preventDefault();

    try {
    await login({ email:email.value, password:password.value })
      navigate('/home')
  } catch (error) {
    console.log("Wrong credentials");
    console.error(error.message)
    setErrorMessage('Nombre de usuario o contraseña incorrectos')
  }
  };

  return (
    <React.Fragment>
      <main>
      <strong className="title">OpoWorld</strong>
      <form
        onSubmit={(ev) => {
          loginUserWithParams(ev);
        }}
      >
        <input
          name="email"
          placeholder="Email"
          {...email}
        />
        <input
          name="password"
          placeholder="Password"
          {...password}
        />
          {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        <button>
          Iniciar sesión
        </button>
        <div className="grid horizontal" style={{ minWidth: "140px" }}>
          <p>o también puedes</p>
          <Link to={PATHS.REGISTER} className="hcenter vcenter">
            Registrarte
          </Link>
        </div>
      </form>
      </main>
    </React.Fragment>
  );
}

/*
        <Link button to="">
          Iniciar Sesión
        </Link>
        <div className="RegisterDiv">
          <p>O también puedes </p>
          <Link to="/register">Registrarte</Link>
                  </div>
*/
