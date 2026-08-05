import axios from 'axios'

// Instancia central de Axios para todo el proyecto.
// Todos los servicios (productoService.js, etc.) deben usar esta instancia
// en vez de crear su propio axios.create(), para mantener un solo punto
// de configuración (baseURL, headers, timeouts, interceptores...).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Interceptor de respuesta: normaliza los errores para que los componentes
// siempre reciban un objeto { message, status } fácil de mostrar en la UI.
// (Relacionado con el rol de Anthony Ríos: manejo global de errores).
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? null
    const message = error.response?.data?.message
      || (error.code === 'ECONNABORTED'
        ? 'La solicitud tardó demasiado. Intenta de nuevo.'
        : 'No se pudo conectar con el servidor. Verifica tu conexión.')

    return Promise.reject({ status, message, original: error })
  }
)

export default api
