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
import Loader from '@/components/Loader.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

defineProps({
  visible: { type: Boolean, default: false },
  producto: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  error: { type: String, default: null },
  productoId: { type: [Number, String], default: null },
})

const emit = defineEmits(['cerrar', 'reintentar'])
</script>

<template>
  <div
    v-if="visible"
    class="modal d-block"
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    aria-labelledby="tituloDetalleProducto"
    style="background: rgba(0,0,0,0.5)"
    @click.self="emit('cerrar')"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="tituloDetalleProducto" class="modal-title">Detalle del producto</h5>
          <button type="button" class="btn-close" aria-label="Cerrar" @click="emit('cerrar')"></button>
        </div>
        <div class="modal-body">
          <Loader v-if="loading" mensaje="Cargando detalle del producto..." />
          <ErrorMessage v-else-if="error" :mensaje="error" @reintentar="emit('reintentar', productoId)" />
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
