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

export const ERRORS = {
    DUPLICATE_KEY : 'E11000'
}

export const AVATAR_PROPS = {
    ID : 'id',
    IMAGE : 'image',
    NAME : 'name',
    CAREER : 'career',
    SPECIALTY : 'specialty',
    ATTRIBUTES : 'attributes', 
    BASE_STATS : {
        LIFE : 'life',
        LEVEL : 'level',
        EXP : 'exp'
    },
}

//#region RPG

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

export const EXP_AND_LEVEL = {
    BASE_EXP : 9,
    C1 : 1.1 ,// depends on how long you want each level to take
    C2 : 0.7, // depends on how close you want to keep the player to the level of the enemies they fight
    CALCULATE_EXP_REQ: function calculateExpReq(level) {
        const baseExp = this.BASE_EXP
        const levelUpDifficult = Math.pow(level, this.C1)
        const progressionDifficult = Math.pow(level, this.C2)
        const expReq = levelUpDifficult * progressionDifficult + baseExp
        return Math.ceil(expReq)
    },
    CALCULATE_LEVEL: function calculatelevel(exp) {
        const baseExp = this.BASE_EXP
        if (exp < baseExp) return 1
        const exponencialSimplify = this.C1 + this.C2
        const levelSimplify = exp - baseExp
        const level = Math.pow(levelSimplify, 1 / exponencialSimplify)
        return Math.ceil(level)
    },
    LIFES_AT_LEVEL_UP: function lifesAtLevelUp() {
        const min = 1
        const max = 3
        const randomNumber = min + Math.random() * (max - min)
        return Math.floor(randomNumber)
    }
}

//#endregion