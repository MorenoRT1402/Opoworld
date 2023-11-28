import { useEffect, useState } from "react";

const useCounter = () => {
    const [miliseconds, setMiliseconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMiliseconds((prevValue) => prevValue + 1);
        }, 1);

        return () => clearInterval(interval); // Clear before mount

    }, []);

    const seconds = () => Math.floor(miliseconds / 1000);

    return {
        miliseconds,
        seconds,
    };
};

export default useCounter;
