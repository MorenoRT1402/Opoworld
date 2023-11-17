import axios from 'axios'
import { BASE_URL } from '../constants'

const baseUrl = `${BASE_URL}/api/users/`

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
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        return response.data
    })
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, get, create, update }