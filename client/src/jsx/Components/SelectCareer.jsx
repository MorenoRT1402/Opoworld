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
  const { field } = careerSelect

  useEffect(() => {
    getCareerNames().then( options => {
      setCareers(options)
    })
  }, [])

  useEffect(() => {
    returnCareer(field.value)
  }, [field.value])

  return (
    <select
    {...field}
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
