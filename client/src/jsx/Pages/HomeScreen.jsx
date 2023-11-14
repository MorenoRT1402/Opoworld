
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedUserContext } from "../../context/LoggedUserContext.jsx";

import AvatarView from "../Components/AvatarView.jsx";


export default function HomeScreen() {
  const { user, logout } = useContext(LoggedUserContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
      if (!user){
        navigate('/login')
      }
  }, [user, navigate])

  return (
    <main className="grid-vertical gap">
      <header>
      <div className="left">
        <h2>
          Username
        </h2>
      </div>
      <div className="right">
      <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      </header>
      <AvatarView/>
      <div className="grid-horizontal gap">
        <button>Crear Pregunta</button>
        <button>Batalla Rápida</button>
      </div>
    </main>
  );
}
