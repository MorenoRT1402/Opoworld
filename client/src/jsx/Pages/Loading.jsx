//import useCounter from "../../Hooks/useCounter";
//import { useEffect, useState } from "react";

export function Loading () {
    /* 
    const seconds = useCounter()

    const [dots, setDots] = useState('');


    useEffect(() => {
        // Reset dots to an empty string after 3 seconds
        if (seconds % 4 === 0) {
            setDots('');
        } else {
            // Add a dot every second until 3 dots are reached
            setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
        }
    }, [seconds]);
    */

    const loadingText = () => {
        return 'Loading...'
//        return `Loading${dots}`

    }

    return (
        <div className="center">
            {loadingText()}
        </div>
    );
}
