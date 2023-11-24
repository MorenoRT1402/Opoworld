/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import avatarsService from "../../services/avatars";
import attributesService from "../../services/attributes";
import { Loading } from "./Loading";
import { BattleContext } from "../../context/BattleContext";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants";

function BattleResult() {
    const { BATTLE_STATES, battleState, expAdded, endBattle } = useContext(BattleContext)
    const [ expText, setExpText ] = useState('')

    const victoryMessage = '¡VICTORIA!'
    const loseMessage = 'DERROTA...'
    const expWonText = 'Experiencia obtenida: '
    const buttonText = 'OK!'

    const messageToShow = battleState == BATTLE_STATES.VICTORY ? victoryMessage : loseMessage

    const getExpText = () => {
        console.log('follow level 22', expAdded)
        return expAdded > 0 ? `${expWonText}${expAdded}` : ''
    }

    useEffect(() => {
        setExpText(getExpText())
    }, [expAdded, battleState])

    const showBattleResult = (() => {
        return (
            <main className="border margin padding gap" style={{ width : "95%", height : "70%", backgroundColor : "lightgray", gap : "50px"}}>
                <h2>{messageToShow}</h2>
                <div>
                    <p>{expText}</p>
                </div>
                <Link to={PATHS.HOME} className="button" onClick={endBattle}> {buttonText} </Link>
            </main>
        )
    })

    const conditionalRender = () => {
        const battleStateCondition = battleState === BATTLE_STATES.VICTORY || battleState === BATTLE_STATES.LOSE
        const condition = expAdded > -1 && battleStateCondition
        console.log('follow result 46', battleState, expAdded)
        return condition ? showBattleResult() : Loading()
    }

    return (
        conditionalRender()
    )
}

// eslint-disable-next-line react/prop-types
function BattlerInfo({ position = 'top', avatar }) {
    const { getBattlerType, getLife } = useContext(BattleContext)
    const [ maxLife, setMaxLife ] = useState(10)

    const battlerType = getBattlerType(position)

    const style = {
        display: 'flex',
        width : '100%',
        flexDirection: position === 'top' ? 'row-reverse' : 'row',
        alignItems: 'center',
//        justifyContent: position === 'top' ? 'flex-end' : 'flex-start',
        marginBottom: position === 'top' ? 'auto' : '0',
        backgroundColor: 'black',
        color : '#fff'
    };
    const getBaseStat = async (prop) => {
        const returnedProp = await attributesService.getBaseStat( avatar, prop)
        return returnedProp
    }

    useEffect(() => {
        getBaseStat('life').then( stat => {
            setMaxLife(stat)
        })
    }, [])

    const avatarImage = ()  => {
        const src = avatar ? avatarsService.getImage(avatar) : '../../../public/vite.svg'
        return src
    }

    const name = avatar.name

    return (
        <div className='gap' style={{ backgroundColor: '', ...style }}>
            <div style={{ margin: '10px', maxWidth: '200px', maxHeight: '100%' }}>
                <img src={avatarImage()} style={{ maxWidth : '100%', maxHeight : '100%'}} alt="" />
            </div>
            <div>
                <p>{name}</p>
                <p>{`${getLife(battlerType)}/${maxLife}`}</p>
            </div>
        </div>
    );
}

function BattleQuestion() {
    const { player, playerTurn, question, checkAnswer } = useContext(BattleContext)


    const instanceOptions = () => {
        const options = question.options;
        if (!options || options.length < 1) return <div></div>;

        return options.map((option, index) => (
            <button key={index} onClick={() => checkAnswer(player, option)}>
                {option.text}
            </button>
        ));
    };

    const showQuestion = () => {
        if(playerTurn)
        return (
            <div className="grid vertical fill" style={{ margin : '1px' }}>
                <div className="center" style={{ 'backgroundColor' : 'white', borderRadius : '10px' }}>
                    <div>
                        <h4> {question.question} </h4>
                    </div>
                </div>
                <div className="grid-horizontal-d2 gap" style={{ marginTop : '100px'}}>
                    {instanceOptions()}
                </div>
            </div>
        );
    }

    return question ? showQuestion() : Loading()
}

function Battleground () {
    const { BATTLE_STATES, battleState } = useContext(BattleContext)

    const getBattlegroundComponent = () => {

        switch (battleState) {
            case BATTLE_STATES.VICTORY:
                return <BattleResult />
            case BATTLE_STATES.LOSE:
                return <BattleResult />
            default:
                return <BattleQuestion />
        }
    }

    return (
        <div className=" center fill" style={{ padding : '100px', width : '70%', height : '70%' }}>
            {getBattlegroundComponent()}
        </div>
    )
}

export default function BattlePage() {
    const { POSITIONS, player, rival } = useContext(BattleContext)

    const setBattleScene = () => {
        return (
            <React.Fragment>
                <BattlerInfo position={POSITIONS.TOP} avatar={rival} />
                <Battleground />
                <BattlerInfo position={POSITIONS.BOTTOM} avatar={player} />
            </React.Fragment>
        )
    }

    return (
        <main className="grid center fillhvh" style={{ margin : '0px'}}>
            {player && rival ? setBattleScene() : Loading()}
        </main>
    );
}
