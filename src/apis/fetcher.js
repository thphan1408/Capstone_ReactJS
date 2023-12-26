import axios from 'axios'
import { CURRENT_USER, TOKEN_CYBERSOFT } from '../constants'

const fetcher = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api',
  headers: {
    TokenCyberSoft: TOKEN_CYBERSOFT,
  },
})

fetcher.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER))
  if (user) {
    // Thêm Authorization vào header
    config.headers['Authorization'] = `Bearer ${user.accessToken}`
  }
  return config
})

fetcher.interceptors.response.use((response) => {
  return response
})

export default fetcher
