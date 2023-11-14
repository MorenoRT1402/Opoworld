import React, { useContext } from "react";
import { useField } from "../../Hooks/useField";
import { Link, useNavigate } from 'react-router-dom'
import { LoggedUserContext } from "../../context/LoggedUserContext";
import { PATHS } from "../../constants";
//import { Link } from "../Navigation/Link";

export default function LoginScreen() {
const navigate = useNavigate()
const email = useField({ type: 'text' })
const password = useField({ type: 'password' })  
const { login } = useContext(LoggedUserContext);

  const loginUserWithParams = async (ev) => {
    ev.preventDefault();

    try {
    await login({ email:email.value, password:password.value })
      navigate('/home')
  } catch (error) {
    console.log("Wrong credentials");
    console.error(error.message)
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
