import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ecommercebackend-fqk1.onrender.com',
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  },
})

api.interceptors.request.use(config => {
  if (typeof window === 'undefined') return config
  const token = localStorage.getItem('token')

  if (token && !config.url?.includes('/auth/login') && !config.url?.includes('/auth/register')) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Add timestamp to prevent caching
  if (config.url?.includes('/products')) {
    config.params = {
      ...config.params,
      _t: Date.now(),
    }
  }

  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      timestamp: new Date().toISOString()
    })

    // Handle 400 errors specifically
    if (error.response?.status === 400) {
      console.warn('Bad Request - Check API parameters')
    }

    // Handle network errors
    if (!error.response) {
      console.warn('Network Error - Backend may be down')
    }

    return Promise.reject(error)
  }
)

export default api
