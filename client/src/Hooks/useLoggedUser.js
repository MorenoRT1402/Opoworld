import { useEffect, useState } from 'react';
import avatarService from '../services/avatars';
import loginService from '../services/login'
import bdConfig from '../services/bdConfig';

export const useLoggedUser = () => {
    const [user, setUser] = useState(() => null);
//    console.log('render useLoggedUser', user)
    const [avatar, setAvatar] = useState(null);
    const USER_STORAGE = 'loggedOpoUser'
    //    const AVATAR_IN_USE = 'avatarInUser'

    const setToken = token => bdConfig.setToken(token)

    const setUserFromLocalStorage = async () => {
        const loggedUserJSON = window.localStorage.getItem(USER_STORAGE);
        if (loggedUserJSON) {
            const userGetted = await JSON.parse(loggedUserJSON);
            setUser(userGetted)
            setToken(userGetted.token);
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
//        console.log('useEffect user update', user)
    }, [user])

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
        setToken(user.token)

        setUser(user);

//        console.log(user, user.token, avatar)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        window.localStorage.removeItem(USER_STORAGE)
    }

    return {
        user,
        avatar,
        login,
        logout
    }
};