import { useState } from "react"

export const useField = ({ type, initialValue = ''}) => {
  const [value, setValue] = useState(initialValue)

  const onChange = event => {
    setValue(event.target.value)
  }

  const field = {
    type,
    value,
    onChange
  }

  return {
    field,
    setValue
  }
}