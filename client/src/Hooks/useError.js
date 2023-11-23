import { useEffect, useState } from "react"

const useError = (defaultMessage = '', timeToVanish = 500) => {
    const [ errorMessage , setErrorMessage ] = useState(defaultMessage)

    useEffect(() => {
        setTimeout( () => setErrorMessage() , timeToVanish)
    }, [errorMessage])

    const errorStyle = {
        color: 'red',
        textAlign: 'center'
    }

    return {
        errorMessage,
        errorStyle,
        setErrorMessage
    }

}

export default useError