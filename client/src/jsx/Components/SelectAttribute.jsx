import { useEffect, useState } from "react";
import attributesService from "../../services/attributes";
import avatarsService from "../../services/avatars";
import { useField } from "../../Hooks/useField";

// eslint-disable-next-line react/prop-types
const SelectAttribute = ( { career, specialty, initialAttr = '', returnAttr }) => {
  const attribute = useField({ initialValue : initialAttr})
  const { field, setValue } = attribute
    const [ stats, setStats ] = useState([]) 
    const { getStatNamesBySpecialtySync } = attributesService
    const { getDefaultAvatar } = avatarsService

    useEffect(() => {
      if(!career || !specialty) return
      getDefaultAvatar().then( avatar => {
        const stats = getStatNamesBySpecialtySync(avatar, career, specialty )
        setStats(stats)
      })
    }, [specialty])

    useEffect(() => {
      setValue(stats[0])
    }, [stats])

    useEffect(() => {
        returnAttr(field.value)
    }, [field.value])

    return (
        <select 
        {...field}
        id="attributes" name="attributes">
            {stats.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        </select>
      );
}

export default SelectAttribute