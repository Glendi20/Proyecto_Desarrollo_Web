<script setup>
// ROL: Anthony Martínez
// -----------------------------------------------------------------------
// Renderiza el catálogo ya filtrado (viene de HomeView) como grid de
// cards. No hace fetch aquí: eso vive en el store (useProductosStore).
//
// Nota (Glendi): grid responsive ya pulido con row-cols-* (1 columna en
// mobile, hasta 4 en escritorio) y el mensaje de "sin resultados" ya
// está resuelto abajo. Si agregas más props/lógica, mantén las clases
// row-cols para no romper el responsive.
import ProductoCard from '@/components/ProductoCard.vue'

defineProps({
  productos: { type: Array, required: true },
})

const emit = defineEmits(['ver-detalle', 'editar', 'eliminar'])
</script>

<template>
  <div v-if="productos.length === 0" class="text-center text-muted py-5">
    <i class="bi bi-search fs-1 d-block mb-2 opacity-50"></i>
    No se encontraron productos con los filtros seleccionados.
  </div>

  <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
    <div v-for="producto in productos" :key="producto.id" class="col">
      <ProductoCard
        :producto="producto"
        @ver-detalle="(id) => emit('ver-detalle', id)"
        @editar="(p) => emit('editar', p)"
        @eliminar="(p) => emit('eliminar', p)"
      />
    </div>
  </div>
</template>
