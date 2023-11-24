import { useEffect, useState } from "react";
import { useField } from "../../Hooks/useField";
import attributesService from "../../services/attributes";
import avatarsService from "../../services/avatars";

// eslint-disable-next-line react/prop-types
const SelectAttribute = ( { career, specialty, initialAttr = '', returnAttr }) => {
    const attribute = useField({ initialValue : initialAttr })
    const [ stats, setStats ] = useState([]) 
    const { getStatsBySpecialtySync } = attributesService
    const { getDefaultAvatar } = avatarsService

    useEffect(() => {
      if(!career || !specialty) return
      getDefaultAvatar().then( avatar => {
        const stats = getStatsBySpecialtySync(avatar, career, specialty )
        setStats(stats)
        returnAttr(stats[0])      
      })
    }, [specialty])

    useEffect(() => {
        returnAttr(attribute.value)
    }, [attribute.value])

    return (
        <select 
        {...attribute}
        id="attributes" name="attributes">
            {stats.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
        </select>
      );
}

export default SelectAttribute