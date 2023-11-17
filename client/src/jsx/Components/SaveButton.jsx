import { useContext } from "react"
import { AvatarContext } from "../../context/AvatarContext"
import { LoggedUserContext } from "../../context/LoggedUserContext"
import { Link } from "react-router-dom"
import { PATHS } from "../../constants"

/* eslint-disable react/prop-types */
export default function SaveButton ({id}) {
    const { avatarData } = useContext(AvatarContext)
    const { newAvatar } = useContext(LoggedUserContext)

    const registerAvatar = () => {
      newAvatar(avatarData, id)
    }
    return (
      <Link to={PATHS.HOME} onClick={registerAvatar} className="button">
      Guardar
      </Link>
    )
  }