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



export default api

