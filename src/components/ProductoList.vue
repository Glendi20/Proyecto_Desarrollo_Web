<script setup>
// ROL: Anthony Martínez
// -----------------------------------------------------------------------
// Renderiza el catálogo ya filtrado (viene de HomeView) como grid de
// cards. No hace fetch aquí: eso vive en el store (useProductosStore).
//
// TODO (Anthony Martínez):
// - Ajustar breakpoints del grid si se necesita (col-12/col-md-6/col-lg-4
//   ya cubre mobile-first básico, coordinar con Glendi para el pulido).
// - Mostrar mensaje "No se encontraron productos" cuando el arreglo
//   filtrado quede vacío (por búsqueda/filtro sin resultados).
import ProductoCard from '@/components/ProductoCard.vue'

defineProps({
  productos: { type: Array, required: true },
})

const emit = defineEmits(['ver-detalle', 'editar', 'eliminar'])
</script>

<template>
  <div v-if="productos.length === 0" class="text-center text-muted py-5">
    No se encontraron productos con los filtros seleccionados.
  </div>

  <div v-else class="row g-3">
    <div v-for="producto in productos" :key="producto.id" class="col-12 col-sm-6 col-lg-4 col-xl-3">
      <ProductoCard
        :producto="producto"
        @ver-detalle="(id) => emit('ver-detalle', id)"
        @editar="(p) => emit('editar', p)"
        @eliminar="(p) => emit('eliminar', p)"
      />
    </div>
  </div>
</template>
