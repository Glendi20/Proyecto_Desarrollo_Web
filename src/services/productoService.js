import api from './api'

// Capa de acceso a datos del recurso "producto".
// Todos los módulos (listado, detalle, crear, editar, eliminar) deben
// consumir estas funciones en lugar de llamar a axios directamente.
// Endpoint base: /producto (definido en VITE_API_BASE_URL + /producto)

const RESOURCE = '/producto'

/**
 * GET /api/producto
 * Usado por: Anthony Martínez (listado general)
 */
export async function getProductos() {
  const { data } = await api.get(RESOURCE)
  return data
}

/**
 * GET /api/producto/{id}
 * Usado por: Anthony Ríos (detalle / modal)
 */
export async function getProductoPorId(id) {
  const { data } = await api.get(`${RESOURCE}/${id}`)
  return data
}

/**
 * POST /api/producto
 * Usado por: César Chamo (creación)
 */
export async function crearProducto(producto) {
  const { data } = await api.post(RESOURCE, producto)
  return data
}

/**
 * PUT /api/producto/{id}
 * Usado por: Eddy Castro (edición)
 */
export async function actualizarProducto(id, producto) {
  const { data } = await api.put(`${RESOURCE}/${id}`, producto)
  return data
}

/**
 * DELETE /api/producto/{id}
 * Usado por: Esaú Mendoza (eliminación)
 */
export async function eliminarProducto(id) {
  const { data } = await api.delete(`${RESOURCE}/${id}`)
  return data
}
