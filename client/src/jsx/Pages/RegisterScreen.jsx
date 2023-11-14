import '../../css/components.css'

import React, { useState } from "react";
import AvatarCreation from "../Components/AvatarCreation";
import { PATHS } from "../../constants";
import { Link } from "react-router-dom";
import { useField } from "../../Hooks/useField";

export default function RegisterScreen() {

  const [avatarData, setAvatarData] = useState({
    userID: "",
    Image: "",
    name: "",
    career: "Educación Primaria",
    specialty: "Generalista"
  })

  const updateAvatarData = (newAvatarData) => {
    setAvatarData(newAvatarData);
  };
  
  const handleRegisterUser = (event) => {
    event.preventDefault();
  };

  const usernameInput = useField({ type: 'text' })
  const emailInput = useField({ type: 'text' })  
  const passwordInput = useField({ type: 'password' })
  
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
        <div>
        <h2>Creación de Avatar</h2>
        <AvatarCreation
          avatarData={avatarData}
          onAvatarDataChange={updateAvatarData} />
        <div className="register-buttons grid vertical gap">
          <Link className="button" to={PATHS.ROOT} onClick={() => handleRegisterUser}>Hecho</Link>
          <Link className='button' to={PATHS.LOGIN}> Volver al Login </Link>
        </div>
        </div>
        
      </form>
      </div>
    </React.Fragment>
  );
}
