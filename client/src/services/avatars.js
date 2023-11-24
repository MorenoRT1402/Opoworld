import axios from 'axios'
import bdConfigService from './bdConfig'
import { BASE_URL } from '../constants'

const baseUrl = `${BASE_URL}/api/avatars/`

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
    const url = `${baseUrl}${idObj}`
    const request = axios.get(url)
    return request.then(response => { 
        return response.data
    })
}

const getRandomAvatar = async () => {
    const avatars = await getAll();
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
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
    const url = `${baseUrl}${id}`
    const avatar = newObject

    const request = axios.put( url, avatar, config)
    return request.then(response => response.data)
}

export default { getDefaultAvatar, getAll, get, getRandomAvatar, getImage, create, update }