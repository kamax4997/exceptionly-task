import axios from 'axios'
import { toast } from 'react-toastify'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // mode: 'no-cors',
  },
})

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    return config
  },
  (err: any) => Promise.reject(err)
)

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response: any) => {
    if (response.status === 200 || response.status === 201) {
      if (response.data.code === 200) {
        return Promise.resolve(response.data)
      } else {
        return Promise.resolve(response)
      }
    } else {
      return Promise.reject(response)
    }
  },
  async (error: any) => {
    toast.error(error.response.data.message)
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      return axiosInstance(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
