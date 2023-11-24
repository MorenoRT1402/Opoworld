/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { LoggedUserContext } from "./LoggedUserContext";
import questionsService from "../services/questions";
import avatarsService from "../services/avatars";
import attributesService from "../services/attributes";

export const BattleContext = createContext()

export function BattleProvider ({children}) {
    const { getRandomAvatar, update } = avatarsService
    const { getRandomOfSpecialty, shuffleOptions } = questionsService
    const { getBaseStat, getStat, getDropExpValue, addExp, updateStats } = attributesService

    const { avatar } = useContext(LoggedUserContext)
    const [ player, setPlayer] = useState(null)
    const [ playerLife, setPlayerLife ] = useState()
    const [ rival, setRival ] = useState(null)
    const [ rivalLife, setRivalLife ] = useState()
    const [ playerTurn, setPlayerTurn ] = useState(true)
    const [ question, setQuestion ] = useState(null)
    const [ statsUpdate, setStatsUpdate ] = useState([])
    const [ battleState, setBattleState ] = useState()
    const [ expAdded, setExpAdded ] = useState(-1)

    //#region Constants

    const STAT_UP_VALUE = 2.56 // The higher the value, the easier it will be to increase the stat.

    const POSITIONS = {
        TOP : 'top',
        BOTTOM : 'bottom'
    }

    const BATTLER_TYPE = {
        PLAYER : 'player',
        RIVAL : 'rival'
    }

    const BATTLE_STATES = {
        NONE : 0,
        STARTED: 'STARTED',
        LOSE: 'LOSE',
        VICTORY: 'VICTORY'
    }

    //#endregion

    //#region UseEffects

    useEffect(() => {
        console.log('53', expAdded, battleState)
    }, [expAdded, battleState])

    useEffect(() => {
        checkBattleState()
    }, [player, playerLife, rival, rivalLife, playerTurn, question])

    useEffect(() => {
        if (avatar) {
            setPlayer(avatar);
            getBaseStat(avatar, 'life').then( life => setPlayerLife(life))
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
            getRandomAvatar().then(avatar => {
                setRival(avatar)
                getBaseStat(avatar, 'life').then( life => setRivalLife(life))
            });
        }
    }, [rival]);

    useEffect(() => {
        if(battleState && battleState != BATTLE_STATES.NONE){ // To avoid early activation
        checkLifes()
        }
    }, [playerLife, rivalLife])

    //#endregion

    //#region Methods

    const checkBattleState = () => {
        if(player && rival && playerLife && rivalLife && playerTurn && (battleState == BATTLE_STATES.NONE || !battleState)){
            setBattleState(BATTLE_STATES.STARTED)
        }
    }
    
    const getBattlerType = position => {
        return position == POSITIONS.TOP ? BATTLER_TYPE.RIVAL : BATTLER_TYPE.PLAYER
    }

    const getLife = battlerType => {
        return battlerType == BATTLER_TYPE.PLAYER ? playerLife : rivalLife
    }

    const toggleTurn = () => {
        setPlayerTurn((prevTurn) => !prevTurn);
    };

    const doDamage = (setTargetLife, stat) => {
        const statValue = stat.value
        const range = 0.5
        const min = 0.75
        const damageMod = Math.random() * range + min; // Between 0.75 and 1.25 
        const damage = Math.max(Math.floor(statValue * damageMod), 1)
        setTargetLife(prevValue => prevValue - damage)
        return stat
    }

    const addStatexp = (avatar, stat) => {
        if (avatar === rival) return;
    
        let existingStatIndex = statsUpdate.findIndex((statUp) => statUp.name === stat.name);

        if (existingStatIndex === -1) {
        // If stat not exists
            setStatsUpdate((prevStatsUpdate) => [...prevStatsUpdate, { name: stat.name, value: stat.value}]);
            existingStatIndex = statsUpdate.length -1
        }
        
        const statToUp = {...statsUpdate[existingStatIndex]}
            const statValue = statToUp.value;
            const minTargetValue = statValue / STAT_UP_VALUE;
            const randomNumber = Math.random() * 100;
        
            if (randomNumber > minTargetValue || randomNumber === 100) {
                    // Update its 'value' adding 1
                    const updatedStats = [...statsUpdate];
                    updatedStats[existingStatIndex].value ++;
                    setStatsUpdate(updatedStats);
            }
    };

    const AddBattleRewards = async () => {
//        if (battleState !== BATTLE_STATES.VICTORY && battleState !== BATTLE_STATES.LOSE) return

        getDropExpValue(rival).then( dropExpValue => {
            const expToAdd = Math.floor(battleState == BATTLE_STATES.VICTORY ? dropExpValue : dropExpValue / 2)
            setExpAdded(expToAdd)
            addExp(avatar, expToAdd)

            updateStats(avatar, avatar.career, avatar.specialty, statsUpdate).then(() => {
                setStatsUpdate([])

                update(avatar, avatar.id).then( response => {return response.data} )
            })
        })
}
    

    const checkLifes = async () => {
        const deadValue = 0
        if (playerLife <= deadValue) {
            console.log('Derrota')
            setBattleState(BATTLE_STATES.LOSE)
            AddBattleRewards()
        }
        else if (rivalLife <= deadValue) {
            console.log('Victoria')
            setBattleState(BATTLE_STATES.VICTORY)
            AddBattleRewards()
        }
    }

    const checkAnswer = (avatar, option) => {
        const isCorrect = option.correct
        const target = avatar === player ? rival : player
        const setTargetLife = target === rival ? setRivalLife : setPlayerLife

        if(isCorrect) {
            getStat(avatar, question.attribute).then( stat => {
                doDamage(setTargetLife, stat)
                addStatexp(avatar, stat)
            })
        }
    }

    const endBattle = () => {
        setBattleState(BATTLE_STATES.NONE)
        setRival(null)
        setExpAdded(-1)
    }

    //#endregion

    return (
        <BattleContext.Provider value={{ POSITIONS, BATTLER_TYPE, getBattlerType, 
        BATTLE_STATES, battleState, player, rival, setRival, playerTurn, toggleTurn, getLife, 
        question, checkAnswer, expAdded, endBattle }}>
          {children}
        </BattleContext.Provider>
      );
}