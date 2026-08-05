<script setup>
// Spinner de carga reutilizable (Bootstrap spinner).
// Usado por: listado, detalle, formularios, eliminación, etc.
// ROL (estilo): Glendi Campos — tamaño/color de marca y fade-in para que
// no "salte" la interfaz al aparecer.
defineProps({
  mensaje: { type: String, default: 'Cargando...' },
})
</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center py-5 fade-in">
    <div class="spinner-border text-primary" style="width: 2.5rem; height: 2.5rem" role="status">
      <span class="visually-hidden">{{ mensaje }}</span>
    </div>
    <p class="mt-3 text-muted mb-0">{{ mensaje }}</p>
  </div>
</template>
