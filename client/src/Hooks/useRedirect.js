import { useContext, useEffect } from "react"
import { LoggedUserContext } from "../context/LoggedUserContext"
import { useNavigate } from "react-router-dom"
import { PATHS } from "../constants"

export const useRedirect = () => {
    const navigate = useNavigate()
    const { user } = useContext(LoggedUserContext)

    useEffect(() => {
        if(user){
            navigate(PATHS.HOME)
        } else {
            navigate(PATHS.LOGIN)
        }
    }, [user, navigate])

}