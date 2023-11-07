import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
const SelectSpecialty = ({ avatarData, selectedCareer }) => {
    const [specialties, setSpecialties] = useState([]);
  
    useEffect(() => {
      const options = getSpecialtiesForCareer(selectedCareer);
      setSpecialties(options);
    }, [selectedCareer]);

    const onSpecialtyChange = (event) => {
      const newAvatarData = { ...avatarData, name: event.target.value };
      avatarData.onAvatarDataChange(newAvatarData);
    }

    function getSpecialtiesForCareer(career) {
      const specialtiesByCareer = {
        "Educación Primaria": ["Generalista", "Ed. Física", "Pedagogía Terapéutica", "Inglés"],
        "Medicina": ["Cardiología", "Pediatría", "Cirugía"],
      };

      return specialtiesByCareer[career] || [];
    }
  
    return (
      <select id="specialty" name="especialidad" onChange={() =>{onSpecialtyChange}}>
        {specialties.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  export default SelectSpecialty
