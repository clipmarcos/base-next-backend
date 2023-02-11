import axios, { AxiosError } from 'axios'

const testApi = axios.create({
  baseURL: '/api/v1',
})

export default testApi
