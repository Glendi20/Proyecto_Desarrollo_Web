<script setup>
// Vista principal: orquesta store + filtros + listado + modales.
// Cada rol conecta aquí su pieza (marcado con comentarios "ROL: ...").
// Si tu tarea es un componente aislado, probablemente NO necesitas tocar
// este archivo salvo para enganchar tu componente al flujo general.
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
const criterios = ref({ nombre: '', categoriaId: null, soloOferta: false })
const productosFiltrados = computed(() => aplicarFiltros(store.productos, criterios.value))

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
async function confirmarEliminacion(id) {
  await store.eliminar(id)
  productoAEliminar.value = null
}
</script>

<template>
  <div class="container py-4">
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
      <h1 class="h3 mb-0">Catálogo de productos</h1>
      <button class="btn btn-success" @click="modalCrearVisible = true">
        <i class="bi bi-plus-lg me-1"></i>Nuevo producto
      </button>
    </div>

    <!-- Barra de filtros: agrupa categorías (Esaú) + búsqueda/oferta (Maryori)
         en un mismo panel visual para que se lea como una sola unidad. -->
    <div class="filtros-panel mb-4">
      <!-- Menú dinámico de categorías (ROL: Esaú Mendoza) -->
      <div class="mb-3">
        <CategoriaMenu
          :categorias="store.categorias"
          :categoria-seleccionada="criterios.categoriaId"
          @seleccionar="(id) => (criterios.categoriaId = id)"
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

    <Loader v-if="store.loading" />
    <ErrorMessage v-else-if="store.error" :mensaje="store.error" @reintentar="store.fetchProductos" />
    <ProductoList
      v-else
      :productos="productosFiltrados"
      @ver-detalle="abrirDetalle"
      @editar="abrirEdicion"
      @eliminar="(producto) => (productoAEliminar = producto)"
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
    <div v-if="modalCrearVisible" class="modal d-block modal-overlay">
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
    <div v-if="productoEnEdicion" class="modal d-block modal-overlay">
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
      @confirmar="confirmarEliminacion"
      @cancelar="productoAEliminar = null"
    />
  </div>
</template>
