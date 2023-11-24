import { useState } from 'react';

const useAvatar = () => {
  const [avatarData, setAvatarData] = useState({
    userID: "",
    image: "",
    name: "",
    career: "Educación Primaria",
    specialty: "Generalista"
  });

  const updateAvatarData = (newAvatarData) => {
    setAvatarData(newAvatarData);
  };

  return { avatarData, updateAvatarData };
};

export default useAvatar;
