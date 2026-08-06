<script setup>
// ROL: Maryori Fajardo
// -----------------------------------------------------------------------
// Input de búsqueda reactiva por nombre. El texto se guarda en un estado
// local (`texto`) y se propaga al v-model (criterios.nombre en
// HomeView.vue) con un debounce de 300ms para no recalcular
// aplicarFiltros() en cada tecla sobre catálogos grandes.
//
// El botón "limpiar" (x) resetea el input y emite el cambio de inmediato,
// sin esperar el debounce, para que la limpieza se sienta instantánea.
import { onBeforeUnmount, ref, watch } from 'vue'

const DEBOUNCE_MS = 300

const modelValue = defineModel({ type: String, default: '' })

const texto = ref(modelValue.value)
let debounceId = null

function limpiarDebounce() {
  if (debounceId !== null) {
    clearTimeout(debounceId)
    debounceId = null
  }
}

// Si algo externo cambia el criterio (p. ej. un futuro botón "limpiar
// filtros" en HomeView), reflejamos el valor en el input sin re-disparar
// el debounce.
watch(modelValue, (nuevoValor) => {
  if (nuevoValor !== texto.value) {
    texto.value = nuevoValor
  }
})

watch(texto, (nuevoValor) => {
  limpiarDebounce()
  debounceId = setTimeout(() => {
    modelValue.value = nuevoValor
  }, DEBOUNCE_MS)
})

function limpiar() {
  limpiarDebounce()
  texto.value = ''
  modelValue.value = ''
}

onBeforeUnmount(limpiarDebounce)
</script>

<template>
  <div class="input-group">
    <span class="input-group-text"><i class="bi bi-search"></i></span>
    <input
      v-model="texto"
      type="text"
      class="form-control"
      placeholder="Buscar producto por nombre..."
      aria-label="Buscar producto por nombre"
    />
    <button
      v-if="texto"
      type="button"
      class="btn btn-outline-secondary"
      aria-label="Limpiar búsqueda"
      @click="limpiar"
    >
      <i class="bi bi-x-lg"></i>
    </button>
  </div>
</template>
