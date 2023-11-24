export const EVENTS = {
    PUSHSTATE: 'pushState',
    POPSTATE: 'popState'
}

export const BUTTONS = {
    PRIMARY: 0
}

export const BASE_URL = 'http://localhost:3001'

export const PATHS = {
    ROOT : '/',
    LOGIN : '/login',
    REGISTER : '/register',
    HOME : '/home',
    AVATAR_EDIT : '/avatar/edit',
    QUESTION_CREATION : '/question/creation',
    BATTLE: '/battle'
}

export const EXP_AND_LEVEL = {
    BASE_EXP : 9,
    C1 : 1.1 ,// depends on how long you want each level to take
    C2 : 0.7, // depends on how close you want to keep the player to the level of the enemies they fight
    CALCULATE_EXP_REQ : () => calculateExpReq,
    CALCULATE_LEVEL : () => calculatelevel,
    LIFES_AT_LEVEL_UP : () => lifesAtLevelUp
}

const lifesAtLevelUp = () => {
    const min = 1
    const max = 3

    const randomNumber = min + Math.random() * ( max - min )
    return randomNumber
}

export const calculateExpReq = level => {
    const baseExp = EXP_AND_LEVEL.BASE_EXP
    const c1 = EXP_AND_LEVEL.C1
    const c2 = EXP_AND_LEVEL.C2

    const expReq = (Math.pow(level, c1) * (Math.pow(level, c2))) + baseExp

    return Math.ceil(expReq)
}

export const calculatelevel = exp => {
    const baseExp = EXP_AND_LEVEL.BASE_EXP
    const c1 = EXP_AND_LEVEL.C1
    const c2 = EXP_AND_LEVEL.C2

    if(exp < baseExp) return 1

    const exponencialSimplify = c1 + c2
    const levelSimplify = exp - baseExp

    const level = Math.pow(levelSimplify, 1 / exponencialSimplify);

    return Math.floor(level)
}