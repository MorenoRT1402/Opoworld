import React, { useState } from "react";
import "../../css/customPage.css";
import AvatarCreation from "../Components/AvatarCreation";
import { Link } from "../Navigation/Link";

export default function RegisterScreen() {
  console.log('alo')

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: ""
  })

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
  
  return (
    <React.Fragment>
      <strong className="title">Registro</strong>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <h2>Creación de Avatar</h2>
        <AvatarCreation
          avatarData={avatarData}
          onAvatarDataChange={updateAvatarData} />
        <div className="grid-vertical">
          <Link button onClick={handleRegisterUser}  to="">Hecho</Link>
          <Link to="/" className='backToLogin'>Volver a Login</Link>
        </div>
      </form>
    </React.Fragment>
  );
}
