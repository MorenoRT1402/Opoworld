import axios from 'axios'
import { BASE_URL } from '../constants'

const baseUrl = `${BASE_URL}/api/login`

const login = async credentials => {
    const { data } = await axios.post(baseUrl, credentials)
    return data
}

export default { login }