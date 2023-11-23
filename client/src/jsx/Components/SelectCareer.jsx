/* eslint-disable react-hooks/exhaustive-deps */
import { /*useContext,*/ useEffect, useState } from "react";
//import { AvatarContext } from "../../context/AvatarContext";
import attributesService from '../../services/attributes'
import { useField } from "../../Hooks/useField";

// eslint-disable-next-line react/prop-types
const SelectCareer = ( { initialCareer, returnCareer }) => {
  const { getCareerNames } = attributesService
  const [ careers, setCareers ] = useState([])
  const careerSelect = useField( { initialValue : initialCareer })

  useEffect(() => {
    getCareerNames().then( options => {
      setCareers(options)
    })
  }, [])

  useEffect(() => {
    returnCareer(careerSelect.value)
  }, [careerSelect.value])

  return (
    <select
    {...careerSelect}
      id="career"
      name="carrera"
    >
      {careers.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectCareer
