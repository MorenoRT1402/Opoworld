/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { LoggedUserContext } from "./LoggedUserContext";
import questionsService from "../services/questions";
import avatarsService from "../services/avatars";

export const BattleContext = createContext()

export function BattleProvider ({children}) {
    const { getRandomAvatar } = avatarsService
    const { getRandomOfSpecialty, shuffleOptions } = questionsService

    const { avatar } = useContext(LoggedUserContext)
    const [ player, setPlayer] = useState(null)
    const [ rival, setRival ] = useState(null)
    const [ playerTurn, setPlayerTurn ] = useState(true)
    const [ question, setQuestion ] = useState(null)

    useEffect(() => {
        if (avatar) {
            setPlayer(avatar);
        }
    }, [avatar]);
    
useEffect(() => {
    if (!player || !rival) return;

    const turnOwner = playerTurn ? player : rival;
    getRandomOfSpecialty(turnOwner.specialty).then(randomQuestion => {
        const shuffledOptions = shuffleOptions(randomQuestion);

        setQuestion({
            ...randomQuestion,
            options: shuffledOptions,
        });
    });
}, [player, rival, playerTurn]);

    
    useEffect(() => {
        if (!rival) {
            getRandomAvatar().then(avatar => setRival(avatar));
        }
    }, [rival]);
    

    const toggleTurn = () => {
        setPlayerTurn((prevTurn) => !prevTurn);
    };

    const checkAnswer = (avatar, option) => {
        console.log('52', avatar, option)
    }

    return (
        <BattleContext.Provider value={{ player, rival, setRival, playerTurn, toggleTurn, question, checkAnswer }}>
          {children}
        </BattleContext.Provider>
      );
}