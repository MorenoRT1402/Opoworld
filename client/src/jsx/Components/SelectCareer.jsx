/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useField } from "../../Hooks/useField";
import { AvatarContext } from "../../context/AvatarContext";

/* eslint-disable react/prop-types */
export default function SelectCarrer () {
  const useAvatar = useContext(AvatarContext)
  const { avatarData, updateAvatarData } = useAvatar
  const career = useField({initialValue : avatarData.career})

  useEffect(() => {
    updateAvatarData({
      ...avatarData,
      career: career.value,
    })
  }, [career.value])

  return (
    <select
    {...career}
      id="career"
      name="carrera"
    >
      <option value="Educación Primaria">Educación Primaria</option>
      <option value="Medicina">Medicina</option>
      <option value="Other">Other</option>
    </select>
  );
}