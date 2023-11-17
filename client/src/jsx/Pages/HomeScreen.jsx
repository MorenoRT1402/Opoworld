import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedUserContext } from "../../context/LoggedUserContext.jsx";
import { useRedirect } from "../../Hooks/useRedirect.js";

import AvatarView from "../Components/AvatarView.jsx";

import { PATHS } from '../../constants';

function EmptyAvatar () {
  return (
    <div className="border container margin">
      <Link to={PATHS.AVATAR_EDIT} style={{margin : "200px"}} className="button" >Crear Avatar</Link>
    </div>
  )
}

export default function HomeScreen() {
  const { user, logout } = useContext(LoggedUserContext);

  useRedirect()

  const handleLogout = () => {
    logout();
  };

  const firstAvatar = () => {
    return user ? user.avatars[0] : null
  }

  return (
    <React.Fragment>
      <header>
      <div className="left">
        <h2>
          {user ? user.username : 'username'}
        </h2>
      </div>
      <div className="right">
      <Link to={PATHS.ROOT} onClick={handleLogout} className="button">
          Logout
        </Link>
      </div>
      </header>
      <main className="grid center gap">
      { firstAvatar()
      ? <AvatarView/>
      : <EmptyAvatar/>
      }
      <div className="grid horizontal center gap">
        <button>Crear Pregunta</button>
        {firstAvatar() ? <button>Batalla Rápida</button> : null}
      </div>
    </main>
    </React.Fragment>

  );
}
