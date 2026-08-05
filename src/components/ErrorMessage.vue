<script setup>
// ROL: Anthony Ríos
// -----------------------------------------------------------------------
// Componente global de retroalimentación de error (fallos de conexión,
// 404, 500, timeout, etc.). El texto viene de store.error, que ya se
// normaliza en src/services/api.js (interceptor de respuesta).
//
// TODO (Anthony Ríos):
// - Agregar botón "Reintentar" que vuelva a llamar fetchProductos().
// - Diferenciar visualmente errores de red vs. errores 4xx/5xx si aplica.
defineProps({
  mensaje: { type: String, required: true },
})

const emit = defineEmits(['reintentar'])
</script>

<template>
  <div class="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
    <span>
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ mensaje }}
    </span>
    <button class="btn btn-sm btn-outline-danger" @click="emit('reintentar')">
      Reintentar
    </button>
  </div>
</template>
