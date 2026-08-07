<script setup>
// Vista de detalle como página completa (alternativa al modal).
// Solo se usa si el equipo decide navegar a /producto/:id en vez de
// abrir ProductoDetalleModal.vue (rol: Anthony Ríos, decisión de equipo).
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductosStore } from '@/stores/productos'
import Loader from '@/components/Loader.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import OfertaBadge from '@/components/OfertaBadge.vue'

const props = defineProps({ id: { type: String, required: true } })
const store = useProductosStore()
const router = useRouter()

onMounted(() => {
  store.fetchProductoPorId(Number(props.id))
})
</script>

<template>
  <div class="container py-4">
    <button class="btn btn-link mb-3 ps-0" @click="router.push('/')">← Volver al catálogo</button>

    <Loader v-if="store.loadingDetalle" mensaje="Cargando detalle del producto..." />
    <ErrorMessage
      v-else-if="store.errorDetalle"
      :mensaje="store.errorDetalle"
      @reintentar="store.fetchProductoPorId(Number(props.id))"
    />
    <div v-else-if="store.productoActual" class="row">
      <div class="col-md-5">
        <img :src="store.productoActual.imagen" :alt="store.productoActual.nombre" class="img-fluid rounded" />
      </div>
      <div class="col-md-7">
        <span class="badge bg-secondary mb-2">{{ store.productoActual.categoriaNombre }}</span>
        <h2>{{ store.productoActual.nombre }}</h2>
        <p>{{ store.productoActual.descripcion }}</p>
        <OfertaBadge
          :precio="store.productoActual.precio"
          :precio-oferta="store.productoActual.precioOferta"
          :en-oferta="store.productoActual.enOferta"
        />
      </div>
    </div>
  </div>
</template>
