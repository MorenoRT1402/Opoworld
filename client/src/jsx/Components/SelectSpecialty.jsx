/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useField } from "../../Hooks/useField";

import attributesService from '../../services/attributes'

/* eslint-disable react/prop-types */
const SelectSpecialty = ({ career, initialSpeciality, returnSpecialty }) => {
    const specialty = useField({initialValue : initialSpeciality}) // Change And Save Current Specialty
    const [specialties, setSpecialties] = useState([]); // Store Updated Options for Input
    const { getSpecialtiesByCareer } = attributesService
  
    useEffect(() => {
      getSpecialtyNamesForCareer(career).then( options => {
        setSpecialties(options)
        returnSpecialty(specialties[0])
    }, [career])})

    useEffect(() => {
      returnSpecialty(specialty.value)
    }, [specialty.value])

async function getSpecialtyNamesForCareer(career) {  
  if (!career) return []
    const specialtyObjects = await getSpecialtiesByCareer({targetCareer : career});
    const specialtyNames = specialtyObjects.map(specialty => specialty.name);
    return specialtyNames;
}
    
    return (
      <select 
      {...specialty}
      id="specialty" name="specialty">
        {specialties.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  export default SelectSpecialty
