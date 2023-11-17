import React, { useContext } from "react";
import { PATHS } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useField } from "../../Hooks/useField";
import { AvatarContext } from "../../context/AvatarContext";
import userService from "../../services/users";
import { LoggedUserContext } from "../../context/LoggedUserContext";

export default function RegisterScreen() {
  const { avatarData } = useContext(AvatarContext)
  const { create } = userService
  const { login } = useContext(LoggedUserContext);
  const navigate = useNavigate()


  const usernameInput = useField({ type: 'text' })
  const emailInput = useField({ type: 'text' })  
  const passwordInput = useField({ type: 'password' })
  
  async function handleRegisterUser () {

    const username = usernameInput.value
    const email = emailInput.value
    const password = passwordInput.value

    const image = avatarData.Image
    const name = avatarData.name
    const career = avatarData.career
    const specialty = avatarData.specialty

    console.log( {user : { username, email, password}})
    console.log( {avatar : { image, name, career, specialty}})

    await create({username, email, password})
    await login({email:email, password:password})
    navigate(PATHS.HOME)
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
        <div className="register-buttons grid vertical gap">
          <Link className="button" to={PATHS.ROOT} onClick={handleRegisterUser}>Hecho</Link>
          <Link className='button' to={PATHS.LOGIN}> Volver al Login </Link>
        </div>
      </form>
      </div>
    </React.Fragment>
  );
}
