import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://staging.duxsoftware.com.ar/api/personal',
  headers: {
    'Content-Type': 'application/json',
  },
})
