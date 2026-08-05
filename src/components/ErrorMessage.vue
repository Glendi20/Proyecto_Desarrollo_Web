<script setup>
// ROL: Anthony Ríos
// -----------------------------------------------------------------------
// Componente global de retroalimentación de error (fallos de conexión,
// 404, 500, timeout, etc.). El texto viene de store.error, que ya se
// normaliza en src/services/api.js (interceptor de respuesta).
//
// TODO (Anthony Ríos):
// - Diferenciar visualmente errores de red vs. errores 4xx/5xx si aplica.
//
// Nota (Glendi): layout ya es responsive (se apila en mobile con
// flex-column, queda en fila en pantallas md+) y tiene fade-in para no
// dar un salto brusco al reemplazar el Loader.
defineProps({
  mensaje: { type: String, required: true },
})

const emit = defineEmits(['reintentar'])
</script>

<template>
  <div
    class="alert alert-danger d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 fade-in"
    role="alert"
  >
    <span>
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ mensaje }}
    </span>
    <button class="btn btn-sm btn-outline-danger align-self-start align-self-md-auto" @click="emit('reintentar')">
      <i class="bi bi-arrow-clockwise me-1"></i>Reintentar
    </button>
  </div>
</template>
