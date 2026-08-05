<script setup>
// ROL: Esaú Mendoza
// -----------------------------------------------------------------------
// Menú dinámico de categorías. La lista de `categorias` viene del getter
// `categorias` del store (useProductosStore), que llama a
// extraerCategorias() en src/utils/categorias.js — ESA es la función que
// debes poder explicar en la Diapositiva 2 (algoritmo DISTINCT).
//
// Este componente solo se encarga de la UI: pintar el menú y emitir el
// id de categoría seleccionado hacia HomeView (que lo pasa a Maryori en
// aplicarFiltros()).
//
// TODO (Esaú):
// - Resaltar visualmente la categoría activa (categoriaSeleccionada).
// - Opción "Todas" para limpiar el filtro de categoría.
// - Si el catálogo es grande, considerar convertir esto en dropdown en mobile.
defineProps({
  categorias: { type: Array, required: true }, // [{ id, nombre }]
  categoriaSeleccionada: { type: [Number, null], default: null },
})

const emit = defineEmits(['seleccionar'])
</script>

<template>
  <div class="d-flex flex-wrap gap-2">
    <button
      class="btn btn-sm"
      :class="categoriaSeleccionada === null ? 'btn-primary' : 'btn-outline-primary'"
      @click="emit('seleccionar', null)"
    >
      Todas
    </button>
    <button
      v-for="categoria in categorias"
      :key="categoria.id"
      class="btn btn-sm"
      :class="categoriaSeleccionada === categoria.id ? 'btn-primary' : 'btn-outline-primary'"
      @click="emit('seleccionar', categoria.id)"
    >
      {{ categoria.nombre }}
    </button>
  </div>
</template>
