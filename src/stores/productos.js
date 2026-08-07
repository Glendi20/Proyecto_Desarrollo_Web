import { defineStore } from 'pinia'
import {
  getProductos,
  getProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '@/services/productoService'
import { extraerCategorias } from '@/utils/categorias'

// Store central de productos. Toda la app lee/escribe el catálogo aquí
// para evitar múltiples fetch descoordinados entre componentes.
//
// Dueño principal: Anthony Martínez (fetchProductos / loading inicial).
// Cada quien añade su propia acción (crear/editar/eliminar) sin romper
// las de los demás. Si necesitas más estado, agrégalo aquí y avisa al equipo.
export const useProductosStore = defineStore('productos', {
  state: () => ({
    productos: [],       // catálogo completo (sin filtrar)
    productoActual: null, // detalle cargado por GET /producto/{id}
    loading: false,
    error: null,          // string legible para mostrar en ErrorMessage.vue
    loadingDetalle: false,
    errorDetalle: null,
  }),

  getters: {
    // DISTINCT de categoriaId + categoriaNombre para el menú dinámico.
    // Lógica real en src/utils/categorias.js (rol: Esaú Mendoza).
    categorias: (state) => extraerCategorias(state.productos),
  },

  actions: {
    async fetchProductos() {
      this.loading = true
      this.error = null
      try {
        this.productos = await getProductos()
      } catch (err) {
        this.error = err.message || 'Error al cargar los productos.'
      } finally {
        this.loading = false
      }
    },

    async fetchProductoPorId(id) {
      this.loadingDetalle = true
      this.errorDetalle = null
      this.productoActual = null
      try {
        this.productoActual = await getProductoPorId(id)
      } catch (err) {
        this.errorDetalle = err.message || 'Error al cargar el producto.'
      } finally {
        this.loadingDetalle = false
      }
    },

    async crear(producto) {
      const nuevo = await crearProducto(producto)
      this.productos.push(nuevo)
      return nuevo
    },

    async actualizar(id, producto) {
      const actualizado = await actualizarProducto(id, producto)
      const idx = this.productos.findIndex((p) => p.id === id)
      if (idx !== -1) this.productos[idx] = actualizado
      return actualizado
    },

    async eliminar(id) {
      await eliminarProducto(id)
      this.productos = this.productos.filter((p) => p.id !== id)
    },
  },
})
