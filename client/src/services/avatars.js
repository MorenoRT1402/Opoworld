import axios from 'axios'
import bdConfigService from './bdConfig'
import attributesService from './attributes'
import { AVATAR_PROPS, BASE_URL } from '../constants'

const baseUrl = `${BASE_URL}/api/avatars`

const { CONTENT_TYPES, getHeader } = bdConfigService

const contentType = CONTENT_TYPES.FORM_DATA

const getDefaultAvatar = () => {
    const extension = 'default'
    const url = `${baseUrl}/${extension}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const get = (id) => {
    let idObj = id
    if (typeof(id) !== 'string') idObj = id.id
    const url = `${baseUrl}/${idObj}`
    const request = axios.get(url)
    return request.then(response => { 
        return response.data
    })
}

const calculatePower = avatar => {
    const { getPropSync, getBaseStatSync, getTotalStatValuesSync } = attributesService
    const LIFE_WEIGHT = 2
    const career = getPropSync(avatar, AVATAR_PROPS.CAREER)
    const life = getBaseStatSync(avatar, AVATAR_PROPS.BASE_STATS.LIFE)
    const specialty = getPropSync(avatar, AVATAR_PROPS.SPECIALTY)
    const totalStatValues = getTotalStatValuesSync(avatar, career, specialty)

    return life * LIFE_WEIGHT + totalStatValues
}

const getClosestPowers = (targetPower, avatarsList) => {
    let closestAvatars = [];
    let minDiff = Number.MAX_SAFE_INTEGER;

    for (const avatar of avatarsList) {
        const avatarPower = calculatePower(avatar);
        const powerDiff = Math.abs(targetPower - avatarPower);

        if (powerDiff < minDiff) {
            minDiff = powerDiff;
            closestAvatars = [avatar];
        } else if (powerDiff === minDiff) {
            closestAvatars.push(avatar);
        }
    }

    return closestAvatars;
};


const getRandomAvatar = async () => {
    const avatars = await getAll();
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
};

const getRandomAvatarMatchmaking = async playerAvatar => {
    if(!playerAvatar) return
    const avatars = await getAll();
    const playerPower = calculatePower(playerAvatar)
    const potenciallyRivals = getClosestPowers(playerPower, avatars)
    const randomIndex = Math.floor(Math.random() * potenciallyRivals.length);
    return potenciallyRivals[randomIndex];
};

const getImage = (avatar) => {
    if(!avatar.image) return
    const path = `${BASE_URL}/${avatar.image}`
    return path
}

const create = (newObject) => {
    const config = getHeader(contentType)

    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const update = (newObject, id) => {
    const config = getHeader(CONTENT_TYPES.JSON)
    const url = `${baseUrl}/${id}`
    const avatar = newObject

    const request = axios.put( url, avatar, config)
    return request.then(response => response.data)
}

export default { getDefaultAvatar, getAll, get, getRandomAvatar, getRandomAvatarMatchmaking, getImage, create, update }