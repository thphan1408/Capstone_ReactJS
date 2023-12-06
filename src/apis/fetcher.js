import axios from 'axios'
import { CURRENT_USER, TOKEN_CYBERSOFT } from '../constants'

const fetcher = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api',
  headers: {
    TokenCyberSoft: TOKEN_CYBERSOFT,
  },
})

fetcher.interceptors.request.use((config) => {
  // console.log('🚀  config:', config)
  const user = JSON.parse(localStorage.getItem(CURRENT_USER))
  if (user) {
    // Thêm Authorization vào header
    config.headers['Authorization'] = `Bearer ${user.accessToken}`
  }
  // console.log('🚀  config:', config)
  return config
})

fetcher.interceptors.response.use((response) => {
  // console.log('🚀  response:', response)
  // const result = {
  //   ...response,
  //   data: {
  //     conten: [],
  //   },
  // }
  return response
})

export default fetcher
