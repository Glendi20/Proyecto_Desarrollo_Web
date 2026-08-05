<script setup>
// ROL: Glendi Campos
// -----------------------------------------------------------------------
// Indicador visual de oferta: etiqueta de descuento + comparación de
// precio original vs. precio de oferta. Se usa en ProductoCard.vue,
// ProductoDetalleModal.vue y ProductoDetalleView.vue.
import { computed } from 'vue'
import { calcularDescuento, formatearPrecio } from '@/utils/precio'

const props = defineProps({
  precio: { type: Number, required: true },
  precioOferta: { type: Number, default: null },
  enOferta: { type: Boolean, default: false },
})

const mostrarOferta = computed(() => props.enOferta && !!props.precioOferta)
const descuento = computed(() => calcularDescuento(props.precio, props.precioOferta))
</script>

<template>
  <div v-if="mostrarOferta" class="oferta-precio" role="text"
    :aria-label="`Precio con ${descuento}% de descuento: antes ${formatearPrecio(precio)}, ahora ${formatearPrecio(precioOferta)}`">
    <span class="badge oferta-badge">
      <i class="bi bi-tag-fill me-1"></i>-{{ descuento }}%
    </span>
    <span class="precio-original">{{ formatearPrecio(precio) }}</span>
    <span class="precio-oferta">{{ formatearPrecio(precioOferta) }}</span>
  </div>
  <div v-else>
    <span class="precio-normal">{{ formatearPrecio(precio) }}</span>
  </div>
</template>

<style scoped>
.oferta-precio {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  animation: aparecer 0.2s ease-out;
}

.oferta-badge {
  background-color: var(--oferta-color, #dc3545);
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.precio-original {
  text-decoration: line-through;
  color: var(--bs-secondary-color, #6c757d);
  font-size: 0.85em;
}

.precio-oferta {
  font-weight: 700;
  color: var(--oferta-precio-color, #146c43);
  font-size: 1.05em;
}

.precio-normal {
  font-weight: 700;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-color-scheme: dark) {
  .precio-oferta {
    color: var(--oferta-precio-color-dark, #75d89b);
  }
}
</style>
