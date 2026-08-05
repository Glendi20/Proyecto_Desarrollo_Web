<script setup>
// ROL: Glendi Campos
// -----------------------------------------------------------------------
// Cintillo ("ribbon") superpuesto en la esquina de la imagen del producto
// cuando está en oferta. Se ubica sobre un contenedor con
// position: relative (ver ProductoCard.vue).
import { computed } from 'vue'
import { calcularDescuento } from '@/utils/precio'

const props = defineProps({
  precio: { type: Number, required: true },
  precioOferta: { type: Number, default: null },
})

const descuento = computed(() => calcularDescuento(props.precio, props.precioOferta))
</script>

<template>
  <span v-if="descuento > 0" class="ribbon-oferta">
    -{{ descuento }}% OFERTA
  </span>
</template>

<style scoped>
.ribbon-oferta {
  position: absolute;
  top: 0.6rem;
  left: -0.4rem;
  background-color: var(--oferta-color, #dc3545);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 0.25rem 0.6rem;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
}

.ribbon-oferta::before {
  content: '';
  position: absolute;
  left: 0;
  top: 100%;
  border-width: 0.2rem 0.2rem 0 0;
  border-style: solid;
  border-color: transparent;
  filter: brightness(0.7);
}
</style>
