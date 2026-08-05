<script setup>
// ROL: Glendi Campos
// -----------------------------------------------------------------------
// Indicador visual de oferta: etiqueta de descuento + comparación de
// precio original vs. precio de oferta. Se usa dentro de ProductoCard.vue
// y en el detalle (ProductoDetalleModal.vue).
//
// TODO (Glendi):
// - Calcular y mostrar el % de descuento.
// - Revisar contraste/accesibilidad del color en modo claro/oscuro.
// - Animación/transición sutil al aparecer la etiqueta.
const props = defineProps({
  precio: { type: Number, required: true },
  precioOferta: { type: Number, default: null },
  enOferta: { type: Boolean, default: false },
})

const porcentajeDescuento = () => {
  if (!props.enOferta || !props.precioOferta) return 0
  return Math.round(100 - (props.precioOferta / props.precio) * 100)
}
</script>

<template>
  <div v-if="enOferta && precioOferta" class="d-flex align-items-center gap-2">
    <span class="badge bg-danger">-{{ porcentajeDescuento() }}%</span>
    <span class="text-decoration-line-through text-muted small">
      ${{ precio.toFixed(2) }}
    </span>
    <span class="fw-bold text-success">${{ precioOferta.toFixed(2) }}</span>
  </div>
  <div v-else>
    <span class="fw-bold">${{ precio.toFixed(2) }}</span>
  </div>
</template>
