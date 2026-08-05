<script setup>
// ROL: Maryori Fajardo
// -----------------------------------------------------------------------
// Switch para combinar el filtro "solo productos en oferta" junto con
// nombre y categoría. Ver src/utils/filtros.js -> aplicarFiltros().
const modelValue = defineModel({ type: Boolean, default: false })
</script>

<template>
  <div class="form-check form-switch">
    <input
      id="filtroOferta"
      v-model="modelValue"
      class="form-check-input"
      type="checkbox"
      role="switch"
    />
    <label class="form-check-label" for="filtroOferta">Solo en oferta</label>
  </div>
</template>
