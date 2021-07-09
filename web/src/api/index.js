import axios from 'axios'
import storage from 'utils/storage'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error?.toString()?.includes('Network') ||
      (error.request._hasError === true &&
        error.request._response.includes('connect'))
    ) {
      return Promise.reject('Não foi possível conectar aos nossos servidores, sem conexão a internet')
    }
    if (error.response?.status === 401) {
      // O token JWT expirou
      storage.remove('token')
      window.location.href = `/`
      return Promise.reject("Sessão expirada, faça login novamente")
    }
    return Promise.reject(error.response.data.message)
  },
)
api.interceptors.request.use(
  config => {
    const token = storage.get('token')
    config.headers.Authorization = `Bearer ${token}`
    config.headers.language = storage.get('lng')
    return Promise.resolve(config)
  },
  error => {
    return Promise.reject(error)
  },
)
export default api