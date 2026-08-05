<script setup>
// ROL: Esaú Mendoza
// -----------------------------------------------------------------------
// Modal de confirmación antes de eliminar (DELETE /producto/{id}).
// Se abre desde HomeView cuando ProductoCard emite "eliminar".
//
// TODO (Esaú):
// - Conectar el botón "Eliminar" con store.eliminar(producto.id).
// - Deshabilitar el botón mientras la petición está en curso (loading
//   local) para evitar doble click / doble DELETE.
// - Feedback visual de éxito/error tras eliminar.
defineProps({
  visible: { type: Boolean, default: false },
  producto: { type: Object, default: null },
})

const emit = defineEmits(['confirmar', 'cancelar'])
</script>

<template>
  <div v-if="visible" class="modal d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmar eliminación</h5>
          <button type="button" class="btn-close" @click="emit('cancelar')"></button>
        </div>
        <div class="modal-body">
          <p>
            ¿Seguro que deseas eliminar
            <strong>{{ producto?.nombre }}</strong>? Esta acción no se puede deshacer.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="emit('cancelar')">Cancelar</button>
          <button type="button" class="btn btn-danger" @click="emit('confirmar', producto?.id)">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
