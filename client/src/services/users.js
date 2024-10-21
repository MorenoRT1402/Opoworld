import axios from 'axios'
import { BASE_URL } from '../constants'

const baseUrl = `${BASE_URL}/api/users/`

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const get = async (id) => {
    const url = `${baseUrl}${id}`
    const request = axios.get(url)
    const response = await request
    return response.data
}

const getGuest = async () => {
    const guest = await axios.get(`${baseUrl}guest`)
    return guest
}

const create = async (newObject) => {
    const request = axios.post(baseUrl, newObject)
    const response = await request
    return response.data
}

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}${id}`, newObject)
    const response = await request
    return response.data
}

export default { getAll, get, getGuest, create, update }