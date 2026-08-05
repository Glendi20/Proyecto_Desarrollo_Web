<script setup>
// ROL: Maryori Fajardo
// -----------------------------------------------------------------------
// Input de búsqueda reactiva por nombre. Emite "buscar" en cada
// keystroke (v-model con debounce opcional) para que HomeView actualice
// el criterio `nombre` que luego pasa a aplicarFiltros() en
// src/utils/filtros.js.
//
// TODO (Maryori):
// - Evaluar si conviene un debounce (~300ms) para catálogos grandes.
// - Botón "limpiar" (x) dentro del input cuando hay texto.
const modelValue = defineModel({ type: String, default: '' })
</script>

<template>
  <div class="input-group">
    <span class="input-group-text"><i class="bi bi-search"></i></span>
    <input
      v-model="modelValue"
      type="text"
      class="form-control"
      placeholder="Buscar producto por nombre..."
    />
  </div>
</template>
