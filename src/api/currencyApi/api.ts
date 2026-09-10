import axios from 'axios'
import { API_BASE_URL } from './consts'

export const api = axios.create({
    baseURL: API_BASE_URL,
})
