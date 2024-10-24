/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import loginService from '../services/login'
import userService from '../services/users'
import avatarService from '../services/avatars'
import bdConfigService from "../services/bdConfig";

export const LoggedUserContext = createContext()

export function LoggedUserProvider ({children}) {
    const [ user, setUser ] = useState(null);
    const [ avatar, setAvatar ] = useState(null);
    const USER_STORAGE = 'loggedOpoUser'

    const setToken = token => bdConfigService.setToken(token)

    const setUserFromLocalStorage = async () => {
        const loggedUserJSON = window.localStorage.getItem(USER_STORAGE);
        if (loggedUserJSON) {
            const userGetted = await JSON.parse(loggedUserJSON);
            setToken(userGetted.token);
            const userUpdated = await userService.get(userGetted.id)
            setUser(userUpdated)
            setAvatarFromUser(userGetted)

            return userGetted
        }
    }

    const setAvatarFromUser = async (paramUser = user) => {
        try {
            if (paramUser && paramUser.avatars && paramUser.avatars.length > 0) {
                const avatarData = await avatarService.get(paramUser.avatars[0]);
                setAvatar(avatarData)
            }
        } catch (error) {
            console.error("Error al obtener detalles del avatar:", error);
            console.log(error)
        }
    }

    useEffect(() => {
        setAvatarFromUser(user)
    }, [user])
    

        /* eslint-disable react-hooks/exhaustive-deps */
        useEffect(() => {
            setUserFromLocalStorage()
        }, []);

    const login = async ({ email, password }) => {

        const user = await loginService.login({
            email,
            password
        })

        window.localStorage.setItem(
            USER_STORAGE, JSON.stringify(user)
        )
        setToken(user.token)

        setUser(user);

    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setAvatar(null)
        window.localStorage.removeItem(USER_STORAGE)
    }

    const newAvatar = (newAvatar, id) => {
        id ? avatarService.update(newAvatar, id) : avatarService.create(newAvatar)
        setAvatar(newAvatar)
    }

    return (
        <LoggedUserContext.Provider value={{ user, avatar, login, logout, newAvatar }}>
          {children}
        </LoggedUserContext.Provider>
      );
}