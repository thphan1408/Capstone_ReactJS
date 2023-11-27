import axios from 'axios'
import { CURRENT_USER } from '../constants'

const fetcher = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/api',
  headers: {
    TokenCyberSoft:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MyIsIkhldEhhblN0cmluZyI6IjMwLzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNDQzNTIwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzE0NTgyODAwfQ.vnuwKd2yPstVSFqQxog9sPBbe9pu5_XdZksPn83M0Hs',
  },
})

fetcher.interceptors.request.use((config) => {
  // console.log('🚀  config:', config)
  const user = JSON.parse(localStorage.getItem(CURRENT_USER))
  if (user) {
    // Thêm Authorization vào header
    config.headers['Authorization'] = user.accessToken
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
