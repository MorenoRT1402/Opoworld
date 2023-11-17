import axios from 'axios'
import { BASE_URL } from '../constants'

const baseUrl = `${BASE_URL}/api/avatars/`

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getHeader = () => {
    return {
        headers: {
            'Content-Type': 'multipart/form-data', 
            Authorization: token
        }
    };
};

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const get = (id) => {
    const url = `${baseUrl}${id}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getImage = (avatar) => {
    const path = `${BASE_URL}/${avatar.image}`
    console.log('ser', path)
    return path
}

const create = ({newObject, token}) => {
    const request = axios.post(baseUrl, newObject, token)
    return request.then(response => response.data)
}

const update = (newObject, id) => {
    const config = getHeader()
    const url = `${baseUrl}${id}`
    const avatar = newObject

    const request = axios.put( url, avatar, config, token)
    return request.then(response => response.data)
}

export default { setToken, getAll, get, getImage, create, update }