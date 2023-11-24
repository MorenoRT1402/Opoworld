import React, { useContext } from "react";
import { ERRORS, PATHS } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useField } from "../../Hooks/useField";
import userService from "../../services/users";
import { LoggedUserContext } from "../../context/LoggedUserContext";
import useError from "../../Hooks/useError";

export default function RegisterScreen() {
  const { create } = userService
  const { login } = useContext(LoggedUserContext);
  const navigate = useNavigate()

  const { errorMessage, errorStyle, setErrorMessage } = useError()


  const usernameInput = useField({ type: 'text' })
  const emailInput = useField({ type: 'text' })  
  const passwordInput = useField({ type: 'password' })
  
  async function handleRegisterUser () {

    if (!usernameInput.value || !emailInput.value || !passwordInput.value) {
      setErrorMessage('Por favor completa todos los campos');
      return;
  }

    const username = usernameInput.value
    const email = emailInput.value
    const password = passwordInput.value

//    console.log( {user : { username, email, password}})
//    console.log( {avatar : { image, name, career, specialty}})

try {
  await create({ username, email, password });
  await login({ email, password });
  navigate(PATHS.HOME);
} catch (err) {
  const errorType = err.response.data.split(" ")[0]
  if (errorType === ERRORS.DUPLICATE_KEY) {
    setErrorMessage('Usuario existente')
  }
  else if (err.response && err.response.data && err.response.data.error) {
    console.log('asadadad')
    setErrorMessage(err.response.data.error);
  } else {
    setErrorMessage('Ha ocurrido un error. Inténtalo de nuevo.');
  }
}
}
  
  return (
    <React.Fragment>
      <strong className="title hcenter">Registro</strong>
      <div className="center">
      <form onSubmit={(ev) => ev.preventDefault()}>
        <div className="grid vertical gap">
        <input
          name="username"
          placeholder="Usuario"
          {...usernameInput}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          {...emailInput}
        />
        <input
          name="password"
          placeholder="Password"
          {...passwordInput}
        />
        </div>
        <div className="">
          {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        </div>
        <div className="register-buttons grid vertical gap">
          <Link className="button" onClick={handleRegisterUser}>Hecho</Link>
          <Link className='button' to={PATHS.LOGIN}> Volver al Login </Link>
        </div>
      </form>
      </div>
    </React.Fragment>
  );
}
