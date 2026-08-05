<script setup>
// Spinner de carga reutilizable (Bootstrap spinner).
// Usado por: listado, detalle, formularios, eliminación, etc.
defineProps({
  mensaje: { type: String, default: 'Cargando...' },
})
</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">{{ mensaje }}</span>
    </div>
    <p class="mt-2 text-muted">{{ mensaje }}</p>
  </div>
</template>
