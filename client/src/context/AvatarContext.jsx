/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AvatarContext = createContext()

export function AvatarProvider ({children}) {
  const [avatarData, setAvatarData] = useState({
      userID: "",
      Image: "",
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

    useEffect(() => {
//      console.log('avatar context upd', avatarData)
    },[avatarData])
    

  return (
      <AvatarContext.Provider value={{ avatarData, updateAvatarData }}>
        {children}
      </AvatarContext.Provider>
    );
}