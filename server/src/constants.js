const DEFAULT_ATTRIBUTES = require('./defaultAttributes.js')

const PUBLIC = 'src/public'
const PUBLIC_IMAGES_DIR_NAME = 'uploads'

//#region RPG

const MULT_EXP_DROPPED = 0.5

const calculateExpReq = level => {
    const baseExp = 9
    const exponencial = 1.1

    const formula = (baseExp + Math.pow(level, exponencial)) * level

    return Math.ceil(formula)
}

//#endregion

module.exports = { PUBLIC, PUBLIC_IMAGES_DIR_NAME, MULT_EXP_DROPPED, calculateExpReq }