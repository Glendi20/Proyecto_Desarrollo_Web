<script setup>
// ROL: Anthony Ríos
// -----------------------------------------------------------------------
// Modal de detalle de producto (GET /producto/{id}).
// Se controla con la prop `visible` + la store.productoActual (cargado
// vía store.fetchProductoPorId(id) desde HomeView).
//
// TODO (Anthony Ríos):
// - Usar el componente Modal de Bootstrap (bootstrap.Modal) o clases
//   utilitarias con v-if/transition; aquí se deja una versión simple
//   con clases Bootstrap "modal" + "show" controladas por v-if.
// - Mostrar Loader.vue mientras `loading` es true.
// - Mostrar ErrorMessage.vue si `error` no es null.
import OfertaBadge from '@/components/OfertaBadge.vue'

defineProps({
  visible: { type: Boolean, default: false },
  producto: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  error: { type: String, default: null },
})

const emit = defineEmits(['cerrar'])
</script>

<template>
  <div v-if="visible" class="modal d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detalle del producto</h5>
          <button type="button" class="btn-close" @click="emit('cerrar')"></button>
        </div>
        <div class="modal-body">
          <div v-if="loading" class="text-center py-4">Cargando...</div>
          <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
          <div v-else-if="producto">
            <img :src="producto.imagen" :alt="producto.nombre" class="img-fluid rounded mb-3" />
            <h4>{{ producto.nombre }}</h4>
            <span class="badge bg-secondary mb-2">{{ producto.categoriaNombre }}</span>
            <p>{{ producto.descripcion }}</p>
            <OfertaBadge
              :precio="producto.precio"
              :precio-oferta="producto.precioOferta"
              :en-oferta="producto.enOferta"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="emit('cerrar')">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>
