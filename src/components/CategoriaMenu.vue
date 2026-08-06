<script setup>
// ROL: Esaú Mendoza
// -----------------------------------------------------------------------
// Menú dinámico construido a partir de las categorías obtenidas mediante
// DISTINCT por la combinación categoriaId + categoriaNombre.
//
// Cada categoría contiene:
// {
//   id: number,
//   nombre: string,
//   nombreVisible: string,
//   clave: string
// }
//
// La clave permite diferenciar categorías que comparten el mismo ID:
// 5::cpu
// 5::entretenimiento
//
// nombreVisible permite distinguir nombres repetidos asociados a IDs
// diferentes:
// Electrónica (ID 1)
// Electrónica (ID 3)

defineProps({
  categorias: {
    type: Array,
    required: true,
  },
  categoriaSeleccionada: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['seleccionar'])
</script>

<template>
  <div class="d-flex flex-wrap gap-2">
    <button
      type="button"
      class="btn btn-sm"
      :class="
        categoriaSeleccionada === null
          ? 'btn-primary'
          : 'btn-outline-primary'
      "
      @click="emit('seleccionar', null)"
    >
      Todas
    </button>

    <button
      v-for="categoria in categorias"
      :key="categoria.clave"
      type="button"
      class="btn btn-sm"
      :class="
        categoriaSeleccionada === categoria.clave
          ? 'btn-primary'
          : 'btn-outline-primary'
      "
      @click="emit('seleccionar', categoria.clave)"
    >
      {{ categoria.nombreVisible ?? categoria.nombre }}
    </button>
  </div>
</template>