import { useEffect, useState } from "react"

export const useLinkedInput = (linkedValue, linkedUpdate = () => {}) => {
    const [value, setValue] = useState(linkedValue)

    useEffect(() => {
        setValue(value)
//        console.log('12', value)
    },[linkedValue])

    useEffect(() => {
        linkedUpdate(value)
    },[value])
}