import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/avatars/'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const config = {
    headers: {
        Authorization: token
    }
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const get = (id) => {
    const url = `${baseUrl}${id}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}${id}`, newObject, config)
    return request.then(response => response.data)
}

export default { setToken, getAll, get, create, update }