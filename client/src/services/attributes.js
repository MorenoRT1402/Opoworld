import axios from 'axios'
import { BASE_URL , EXP_AND_LEVEL} from '../constants'
import avatarService from './avatars'

const baseUrl = `${BASE_URL}/api/attr`

const { getDefaultAvatar } = avatarService

const getDefaultAttributes = () => {
    const url = `${baseUrl}`
    const request = axios.get(url)
    return request.then(response => {
        const respo = response.data
        return respo
    })
}

const getMultExpDrop = () => {
    const extension = 'multexpdropped'
    const url = `${baseUrl}/${extension}`
    const request = axios.get(url)
    return request.then(response => {
        const respo = response.data
        return respo
    })
}


const getAttributesObject = avatar => {
    if (avatar.attributes) {
        return avatar.attributes[0]
    } else {
        getDefaultAttributes().then(defaultAttrs => {
            return defaultAttrs
        })
    }
}

const getBaseStats = (obj) => {
    let modelAvatar
    const baseStats = getAttributesObject(obj).baseStats
    if (baseStats) {
        modelAvatar = obj
    } else {
        getDefaultAttributes().then(attributes => {
            modelAvatar.attributes[0] = attributes
        })
    }
    return getAttributesObject(modelAvatar).baseStats
}

const getBaseStat = async (obj, prop) => {
    const baseStats = getBaseStatsSync(obj)
    return baseStats[prop]
}

const getCareers = async avatar => {
    const avatarModel = avatar ? avatar : await getDefaultAvatar()
    const attributes = getAttributesObject(avatarModel)
    for (const key in attributes)
        if (key === 'careers') {
            return attributes[key]
        }
}


const getCareer = async (avatar, targetCareer) => {
    const careers = await getCareers(avatar)
    for (const careerIndex in careers) {
        const searchedCareer = careers[careerIndex]
        if (searchedCareer.name === targetCareer) {
            return searchedCareer
        }
    }
}

const getCareerNames = async avatar => {
    const careerNames = [];

    function byParams() {
        return avatar
    }

    async function byServer() {
        const avatar = await getDefaultAvatar()
        return avatar
    }

    async function getAvatar () {
        if (avatar) {
            return byParams();
        } else {
            const avatar = await byServer()
            return avatar
        }
    }

    const avatarGetted = await getAvatar()
    const careers = await getCareers(avatarGetted)

    for (const index in careers) {
        careerNames.push(careers[index].name)
    }

    return careerNames;
}

const getSpecialties = async () => {
    const careers = await getCareers();
    const uniqueSpecialties = new Set();
    
    for (let c in careers) {
        const specialties = careers[c].specialties;
        specialties.forEach(specialty => {
            uniqueSpecialties.add(specialty);
        });
    }

    const specialtiesArray = Array.from(uniqueSpecialties); // Convertir Set to array
    return specialtiesArray;
};


const getSpecialtiesByCareer = async ({ avatar, targetCareer, careerAttributes }) => {
    const specialties = [];

    async function byAvatar(avatar) {
        const searchedCareer = await getCareer(avatar, targetCareer)

        return searchedCareer
    }

    function byCareerAttributes(careerAttributes) {
        return careerAttributes
    }

    async function byTarget() {
        const defaultAvatar = await avatarService.getDefaultAvatar()
        const careerAttr = await byAvatar(defaultAvatar)
        return careerAttr

    }

    async function getSearchedCareer () {
        if (avatar && targetCareer) {
            return byAvatar(avatar);
        } else if (careerAttributes) {
            return byCareerAttributes(careerAttributes)
        } else return await byTarget()
    }

    const searchedCareer = await getSearchedCareer()

    searchedCareer.specialties.forEach(specialty => {
        specialties.push(specialty);
    });

    return specialties;
}

const getAttributesDict = async avatar => {
    const career = avatar.career

    const specialties = await getSpecialtiesByCareer({ obj : avatar, targetCareer : career })
    for (let i = 0; i < specialties.length; i++) {
        const specialty = specialties[i]
        if (specialty.name === avatar.specialty)
            return specialty.stats
    }
}

const getStatNamesBySpecialty = async ({ specialtyName }) => {
    const specialties = await getSpecialties();
    const matchingStats = [];

    for (let sp in specialties) {
        const specialty = specialties[sp];

        if (specialty.name === specialtyName) {
            const stats = specialty.stats;
            for (let s in stats) {
                matchingStats.push(stats[s].name);
            }
        }
    }

    return matchingStats;
};

const getStat = async (avatar, statName) => {
    const attributesDict = await getAttributesDict(avatar)
    for( var statIndex in attributesDict ) {
        if ( attributesDict[ statIndex ].name === statName ){
            return attributesDict[statIndex]
        }
    }
}

const LevelUp = avatar => {
    const lifeUp = EXP_AND_LEVEL.LIFES_AT_LEVEL_UP()
    const baseStats = getBaseStatsSync(avatar)
    baseStats.life+= lifeUp
    baseStats.level++
}

const checkLevelUp = async (avatar, newTotalExp) => {
    const avatarLevel = getBaseStatSync(avatar, 'level')
    console.log('208', avatarLevel, newTotalExp)
    const newLevel = EXP_AND_LEVEL.CALCULATE_LEVEL(newTotalExp)
    const levelDiff = newLevel(newTotalExp) - avatarLevel

    console.log('212', levelDiff)
    
    for (let i = 0; i < levelDiff; i++) {
        LevelUp(avatar)
    }
}

const addExp = async ( avatar, expToAdd ) => {
    const baseStats = getBaseStatsSync(avatar)
    baseStats.exp += expToAdd

    checkLevelUp(avatar, baseStats.exp)
} 

const updateStats = async (avatar, careerName, specialtyName, newStats) => {
    const oldStats = getStatsBySpecialtySync(avatar, careerName, specialtyName);

    for (const newStat of newStats) {
        const existingStatIndex = oldStats.findIndex(stat => stat.name === newStat.name);

        if (existingStatIndex !== -1) {
            if (oldStats[existingStatIndex].value !== newStat.value) {
                oldStats[existingStatIndex].value = newStat.value;
            }
        } else {
            oldStats.push(newStat);
        }
    }

    avatarService.update(avatar, avatar.id).then( response => {return response.data} )
};


const getDropExpValue = async (avatar) => {
    const totalExp = getBaseStatSync(avatar, 'exp') + 1
    console.log('251', totalExp)
    const multExpDropped = await getMultExpDrop()
    return Math.ceil(totalExp * multExpDropped)
}

//#region Sync methods

const getPropSync = (avatar, prop) => {
    console.log('262',avatar, prop, avatar[prop])
    return avatar[prop]
}

const getAttributesSync = avatar => {
    const attributes = getPropSync(avatar, 'attributes')
    console.log('267', attributes)
    return attributes[0]
}

const getBaseStatsSync = avatar => {
    console.log('273', avatar )
    const attributes = getAttributesSync(avatar)
    console.log('271', attributes, attributes.baseStats)
    return attributes.baseStats
}

const getBaseStatSync = (avatar, statName) => {
    const baseStats = getBaseStatsSync(avatar)
    console.log('280', baseStats, baseStats[statName])
    return baseStats[statName]
}

const getCareersSync = avatar => {
    const attributes = getAttributesSync(avatar)
    return attributes.careers
}

const getCareerSync = (avatar, careerName) => {
    const careers = getCareersSync(avatar)

    console.log('275', careers)
    
    for (var careerIndex in careers){
        const career = careers[careerIndex]
        if (career.name == careerName)
            return career
    }
}

const getSpecialtiesByCareerSync = (avatar, careerName) => {
    console.log('283', avatar, careerName)
    const careers = getCareerSync(avatar, careerName)
    console.log('285', careers)
    return careers.specialties
}

const getSpecialtySync = (avatar, careerName, specialtyName) => {
    console.log('293', careerName)
    const specialties = getSpecialtiesByCareerSync(avatar, careerName)
    
    for (var specialtyIndex in specialties){
        const specialty = specialties[specialtyIndex]
        if (specialty.name == specialtyName)
            return specialty
    }
}

const getStatsBySpecialtySync = (avatar, careerName, specialtyName) => {
    console.log('304', careerName, specialtyName)
    const specialty = getSpecialtySync(avatar, careerName, specialtyName)
    return specialty.stats
}

const getStatByNameSync = (avatar, careerName, specialtyName, statName) => {
    const stats = getStatsBySpecialtySync(avatar, careerName, specialtyName)
    
    for (var statIndex in stats){
        const stat = stats[statIndex]
        if (stat.name == statName)
            return stat
    }
}

//#endregion


export default { 
    getDefaultAttributes, getAttributesObject, getBaseStat, getCareerNames, 
    getSpecialtiesByCareer, getAttributesDict, getStatNamesBySpecialty, getStat, updateStats,
    getDropExpValue, addExp
}