<script setup>
// ROL: Esaú Mendoza
// Modal de confirmación para DELETE /producto/{id}.

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  producto: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['confirmar', 'cancelar'])
</script>

<template>
  <div
    v-if="visible"
    class="modal d-block"
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    aria-labelledby="tituloEliminar"
    style="background: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="tituloEliminar" class="modal-title">
            Confirmar eliminación
          </h5>

          <button
            type="button"
            class="btn-close"
            aria-label="Cerrar"
            :disabled="loading"
            @click="emit('cancelar')"
          ></button>
        </div>

        <div class="modal-body">
          <div
            v-if="error"
            class="alert alert-danger"
            role="alert"
          >
            {{ error }}
          </div>

          <p class="mb-0">
            ¿Seguro que deseas eliminar
            <strong>{{ producto?.nombre }}</strong>?
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            :disabled="loading"
            @click="emit('cancelar')"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="btn btn-danger"
            :disabled="loading || producto?.id == null"
            :aria-busy="loading"
            @click="emit('confirmar', producto?.id)"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>

            {{ loading ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>