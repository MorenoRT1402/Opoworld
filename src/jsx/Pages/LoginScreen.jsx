import React, { useEffect, useState } from "react";
import "./../../css/customPage.css";
import loginService from "../../services/login";
import avatarService from "../../services/avatars"
//import { Link } from "../Navigation/Link";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedOpoUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      avatarService.setToken(user.token)
    }
  }, [])

  const loginUserWithParams = (ev) => {
    ev.preventDefault();

    loginService
      .login({ email:email, password:password })
      .then((user) => {

        window.localStorage.setItem(
          'loggedOpoUser', JSON.stringify(user)
        )
        avatarService.setToken(user.token)
        setUser(user);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("Wrong credentials");
        console.error(error.message)
      });

    console.log(`Loging with ${email} ${password}`);
  };

  return (
    <React.Fragment>
      <strong className="title">OpoWorld</strong>
      <form
        onSubmit={(ev) => {
          loginUserWithParams(ev);
        }}
      >
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>
          Iniciar sesión
        </button>
        <p>o también puedes</p>
        <a href="">Registrate</a>
      </form>
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
