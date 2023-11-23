import { useEffect, useState } from "react"

export const useField = ({ type, initialValue = ''}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    //      console.log('field upd', value)
  }, [value])

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}