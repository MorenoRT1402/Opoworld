import React, { useState } from "react";
import "./../../css/customPage.css";
import { Link } from "../Navigation/Link";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUserWithParams = () => {
    console.log(`Logging with ${email} ${password}`);
  };

  return (
    <React.Fragment>
      <strong className="title">OpoWorld</strong>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          loginUserWithParams();
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
        <Link button onClick={loginUserWithParams} to="">
          Iniciar Sesión
        </Link>
        <div className="RegisterDiv">
          <p>O también puedes </p>
          <Link to="/register">Registrarte</Link>
        </div>
      </form>
    </React.Fragment>
  );
}
