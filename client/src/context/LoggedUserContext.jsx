/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import loginService from '../services/login'
import avatarService from '../services/avatars'

export const LoggedUserContext = createContext()

export function LoggedUserProvider ({children}) {
    const [ user, setUser ] = useState(null);
    const [ avatar, setAvatar ] = useState(null);
    const USER_STORAGE = 'loggedOpoUser'

    const setUserFromLocalStorage = async () => {
        const loggedUserJSON = window.localStorage.getItem(USER_STORAGE);
        if (loggedUserJSON) {
            const userGetted = await JSON.parse(loggedUserJSON);
            setUser(userGetted)
            avatarService.setToken(userGetted.token);
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

    /*
    useEffect(() => {
        console.log('useEffect user update', user)
    }, [user])
    */

        /* eslint-disable react-hooks/exhaustive-deps */
        useEffect(() => {
            setUserFromLocalStorage();
        }, []);

    const login = async ({ email, password }) => {

        const user = await loginService.login({
            email,
            password
        })

        window.localStorage.setItem(
            USER_STORAGE, JSON.stringify(user)
        )
        avatarService.setToken(user.token)

        setUser(user);

        console.log('sasas', user)

        console.log(user, user.token, avatar)
    }

    const logout = () => {
        setUser(null)
        avatarService.setToken(null)
        window.localStorage.removeItem(USER_STORAGE)
    }

    return (
        <LoggedUserContext.Provider value={{ user, avatar, login, logout }}>
          {children}
        </LoggedUserContext.Provider>
      );
}