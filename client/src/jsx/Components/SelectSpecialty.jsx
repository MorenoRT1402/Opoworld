/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useField } from "../../Hooks/useField";
import attributesService from '../../services/attributes'

/* eslint-disable react/prop-types */
const SelectSpecialty = ({ career, initialSpeciality, returnSpecialty }) => {
  const specialty = useField({ initialValue : initialSpeciality})
  const { field, setValue } = specialty
    const [specialties, setSpecialties] = useState([]); // Store Updated Options for Input
    const { getSpecialtiesByCareer } = attributesService

    useEffect(() => {
      getSpecialtyNamesForCareer(career).then( options => {
        setSpecialties(options)
    })}, [career])

    useEffect(() => {
      setValue(specialties[0])
    }, [specialties])

    useEffect(() => {
      returnSpecialty(field.value)
    }, [field.value])

async function getSpecialtyNamesForCareer(career) {  
  if (!career) return []
    const specialtyObjects = await getSpecialtiesByCareer({targetCareer : career});
    const specialtyNames = specialtyObjects.map(specialty => specialty.name);
    return specialtyNames;
}
    
    return (
      <select
      {...field}
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
