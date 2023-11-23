/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import avatarService from '../services/avatars'

export const AvatarContext = createContext()

export function AvatarProvider ({children}) {
  const [ attributes ] = useState(null)
  const [ avatarData, setAvatarData] = useState({
      userID: "",
      image: "",
      name: "",
      career: "Educación Primaria",
      specialty: "Generalista"
    });

    const updateAvatarData = (newAvatarData) => {
      setAvatarData((prevAvatarData) => ({
        ...prevAvatarData,
        ...newAvatarData,
      }));
    };

    const initAvatar = () => {
      if (!avatarData.attributes)
      avatarService.getDefaultAvatar().then( defaultAvatar => {
        updateAvatarData(defaultAvatar)
      })
    }

    useEffect(() => {
//      console.log('avatar context upd', avatarData)
    },[avatarData])

    useEffect(() => {
      initAvatar()
    } ,[])

    useEffect(() => {
//      console.log('attributes changed: ', attributes)
    },[attributes])

  return (
      <AvatarContext.Provider value={{ avatarData, updateAvatarData, attributes }}>
        {children}
      </AvatarContext.Provider>
    );
}