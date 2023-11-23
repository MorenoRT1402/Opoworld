/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import avatarsService from "../../services/avatars";
import attributesService from "../../services/attributes";
import { Loading } from "./Loading";
import { LoggedUserContext } from "../../context/LoggedUserContext";
import questionsService from "../../services/questions";
import { BattleContext } from "../../context/BattleContext";

// eslint-disable-next-line react/prop-types
function BattlerInfo({ position = 'top', avatar }) {
    const [ life, setLife ] = useState(10)
    const [ maxLife, setMaxLife ] = useState(10)

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
        console.log(avatar)
        const returnedProp = await attributesService.getBaseStat( avatar, prop)
        return returnedProp
    }

    useEffect(() => {
        getBaseStat('life').then( stat => {
            setMaxLife(stat)
            setLife(stat)
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
                <p>{`${life}/${maxLife}`}</p>
            </div>
        </div>
    );
}

function BattleQuestion() {
    const { player, question, checkAnswer } = useContext(BattleContext)


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

    return (
        <div className=" center fill" style={{ padding : '100px', width : '70%', height : '70%' }}>
            <BattleQuestion />
        </div>
    )
}

export default function BattlePage() {
    const { player, rival } = useContext(BattleContext)

    const setBattleScene = () => {
        return (
            <React.Fragment>
                <BattlerInfo position='top' avatar={rival} />
                <Battleground />
                <BattlerInfo position='bottom' avatar={player} />
            </React.Fragment>
        )
    }

    return (
        <main className="grid center fillhvh" style={{ margin : '0px'}}>
            {player && rival ? setBattleScene() : Loading()}
        </main>
    );
}
