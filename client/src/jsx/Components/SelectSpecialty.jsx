/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { AvatarContext } from "../../context/AvatarContext";
import { useField } from "../../Hooks/useField";

/* eslint-disable react/prop-types */
const SelectSpecialty = () => {
    const useAvatar = useContext(AvatarContext)
    const { avatarData, updateAvatarData } = useAvatar
    const specialty = useField({initialValue : avatarData.specialty})
    const [specialties, setSpecialties] = useState([]);
  
    useEffect(() => {
      const options = getSpecialtiesForCareer(avatarData.career);
      setSpecialties(options);
    }, [avatarData.career]);

    useEffect(() => {
      updateAvatarData({
        ...avatarData,
        specialty: specialty.value,
      })
    }, [specialty.value])

    function getSpecialtiesForCareer(career) {
      const specialtiesByCareer = {
        "Educación Primaria": ["Generalista", "Ed. Física", "Pedagogía Terapéutica", "Inglés"],
        "Medicina": ["Cardiología", "Pediatría", "Cirugía"],
        "Other": ["Example"]
      };

      return specialtiesByCareer[career] || [];
    }
  
    return (
      <select 
      {...specialty}
      id="specialty" name="especialidad">
        {specialties.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  export default SelectSpecialty
