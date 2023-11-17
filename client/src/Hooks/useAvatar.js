import { useState } from 'react';

const useAvatar = () => {
  const [avatarData, setAvatarData] = useState({
    userID: "",
    Image: "",
    name: "",
    career: "Educación Primaria",
    specialty: "Generalista"
  });

  const updateAvatarData = (newAvatarData) => {
    setAvatarData(newAvatarData);
    console.log({avatarData})
  };

  return { avatarData, updateAvatarData };
};

export default useAvatar;
