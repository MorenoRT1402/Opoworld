import axios from 'axios'
import { BASE_URL } from '../constants'
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
    return await getBaseStats(obj)[prop]
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
    console.log('162', specialties, specialtyName)
    const matchingStats = [];

    for (let sp in specialties) {
        const specialty = specialties[sp];
        console.log('167', specialty)

        if (specialty.name === specialtyName) {
            const stats = specialty.stats;
            console.log('171', stats)
            for (let s in stats) {
                matchingStats.push(stats[s].name);
            }
        }
    }

    return matchingStats;
};


export default { getDefaultAttributes, getAttributesObject, getBaseStat, getCareerNames, getSpecialtiesByCareer, getAttributesDict, getStatNamesBySpecialty }