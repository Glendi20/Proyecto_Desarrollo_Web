<script setup>
// Vista principal: orquesta store + filtros + listado + modales.
// Cada rol conecta aquí su pieza (marcado con comentarios "ROL: ...").
import { computed, onMounted, ref } from 'vue'
import { useProductosStore } from '@/stores/productos'
import { aplicarFiltros } from '@/utils/filtros'

import Loader from '@/components/Loader.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import ProductoList from '@/components/ProductoList.vue'
import CategoriaMenu from '@/components/CategoriaMenu.vue'
import SearchBar from '@/components/SearchBar.vue'
import FiltroOferta from '@/components/FiltroOferta.vue'
import ProductoDetalleModal from '@/components/ProductoDetalleModal.vue'
import ProductoFormCreate from '@/components/ProductoFormCreate.vue'
import ProductoFormEdit from '@/components/ProductoFormEdit.vue'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'

const store = useProductosStore()

onMounted(() => {
  store.fetchProductos()
})

// --- Filtros combinados (ROL: Maryori Fajardo) ---
const criterios = ref({
  nombre: '',
  categoriaClave: null,
  soloOferta: false,
})

const productosFiltrados = computed(() =>
  aplicarFiltros(store.productos, criterios.value),
)

// --- Detalle (ROL: Anthony Ríos) ---
const modalDetalleVisible = ref(false)

function abrirDetalle(id) {
  modalDetalleVisible.value = true
  store.fetchProductoPorId(id)
}

function cerrarDetalle() {
  modalDetalleVisible.value = false
  store.productoActual = null
}

// --- Crear (ROL: César Chamo) ---
const modalCrearVisible = ref(false)

// --- Editar (ROL: Eddy Castro) ---
const productoEnEdicion = ref(null)

function abrirEdicion(producto) {
  productoEnEdicion.value = producto
}

// --- Eliminar (ROL: Esaú Mendoza) ---
const productoAEliminar = ref(null)
const eliminando = ref(false)
const errorEliminacion = ref('')
const mensajeEliminacion = ref('')

function abrirEliminacion(producto) {
  productoAEliminar.value = producto
  errorEliminacion.value = ''
  mensajeEliminacion.value = ''
}

function cancelarEliminacion() {
  // Evita cerrar el modal mientras la solicitud DELETE está en proceso.
  if (eliminando.value) return

  productoAEliminar.value = null
  errorEliminacion.value = ''
}

async function confirmarEliminacion(id) {
  // Evita solicitudes sin ID o múltiples solicitudes por doble clic.
  if (id == null || eliminando.value) return

  eliminando.value = true
  errorEliminacion.value = ''
  mensajeEliminacion.value = ''

  try {
    await store.eliminar(id)

    mensajeEliminacion.value = 'Producto eliminado correctamente.'
    productoAEliminar.value = null
  } catch (error) {
    errorEliminacion.value =
      error.response?.data?.message ||
      error.message ||
      'No fue posible eliminar el producto. Intenta nuevamente.'
  } finally {
    eliminando.value = false
  }
}
</script>

<template>
  <div class="container py-4">
    <div
      class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3"
    >
      <h1 class="h3 mb-0">Catálogo de productos</h1>

      <button
        type="button"
        class="btn btn-success"
        @click="modalCrearVisible = true"
      >
        <i class="bi bi-plus-lg me-1"></i>
        Nuevo producto
      </button>
    </div>

    <!-- Mensaje de éxito después de eliminar -->
    <div
      v-if="mensajeEliminacion"
      class="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {{ mensajeEliminacion }}

      <button
        type="button"
        class="btn-close"
        aria-label="Cerrar"
        @click="mensajeEliminacion = ''"
      ></button>
    </div>

    <!-- Barra de filtros -->
    <div class="filtros-panel mb-4">
      <!-- Menú dinámico de categorías (ROL: Esaú Mendoza) -->
      <div class="mb-3">
        <CategoriaMenu
          :categorias="store.categorias"
          :categoria-seleccionada="criterios.categoriaClave"
          @seleccionar="
            (clave) => (criterios.categoriaClave = clave)
          "
        />
      </div>

      <!-- Búsqueda + filtro de oferta (ROL: Maryori Fajardo) -->
      <div class="row g-2">
        <div class="col-12 col-md-6">
          <SearchBar v-model="criterios.nombre" />
        </div>

        <div class="col-12 col-md-6 d-flex align-items-center">
          <FiltroOferta v-model="criterios.soloOferta" />
        </div>
      </div>
    </div>

    <!-- Estado general del catálogo -->
    <Loader v-if="store.loading" />

    <ErrorMessage
      v-else-if="store.error"
      :mensaje="store.error"
      @reintentar="store.fetchProductos"
    />

    <ProductoList
      v-else
      :productos="productosFiltrados"
      @ver-detalle="abrirDetalle"
      @editar="abrirEdicion"
      @eliminar="abrirEliminacion"
    />

    <!-- Modal detalle -->
    <ProductoDetalleModal
      :visible="modalDetalleVisible"
      :producto="store.productoActual"
      :loading="store.loading"
      :error="store.error"
      @cerrar="cerrarDetalle"
    />

    <!-- Modal crear -->
    <div
      v-if="modalCrearVisible"
      class="modal d-block modal-overlay"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content p-3">
          <ProductoFormCreate
            @creado="modalCrearVisible = false"
            @cancelar="modalCrearVisible = false"
          />
        </div>
      </div>
    </div>

    <!-- Modal editar -->
    <div
      v-if="productoEnEdicion"
      class="modal d-block modal-overlay"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content p-3">
          <ProductoFormEdit
            :producto="productoEnEdicion"
            @actualizado="productoEnEdicion = null"
            @cancelar="productoEnEdicion = null"
          />
        </div>
      </div>
    </div>

    <!-- Modal confirmar eliminación -->
    <ConfirmDeleteModal
      :visible="!!productoAEliminar"
      :producto="productoAEliminar"
      :loading="eliminando"
      :error="errorEliminacion"
      @confirmar="confirmarEliminacion"
      @cancelar="cancelarEliminacion"
    />
  </div>
</template>