import { useEffect, useState } from "react";
import { useField } from "../../Hooks/useField";
import attributesService from "../../services/attributes";

// eslint-disable-next-line react/prop-types
const SelectAttribute = ( { specialty, initialAttr = '', returnAttr }) => {
    const attribute = useField({ initialValue : initialAttr })
    const [ stats, setStats ] = useState([]) 
    const { getStatNamesBySpecialty } = attributesService

    useEffect(() => {
        getStatNamesBySpecialty({specialtyName : specialty}).then( stats => {
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
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        </select>
      );
}

export default SelectAttribute