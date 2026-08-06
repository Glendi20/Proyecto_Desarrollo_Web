<script setup>
import { ref } from 'vue'
import { useProductoForm } from '@/composables/useProductoForm'
import { useProductosStore } from '@/stores/productos'

// ROL: Eddy Castro
// Formulario de edición de producto mediante PUT /producto/{id}.

const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['actualizado', 'cancelar'])

const store = useProductosStore()

// El composable precarga el formulario con el producto seleccionado.
const { form, errores, validar } = useProductoForm(props.producto)

const guardando = ref(false)
const mensajeError = ref('')
const mensajeExito = ref('')

function obtenerMensajeError(error) {
  return (
    error.response?.data?.message ||
    error.response?.data?.title ||
    error.message ||
    'No fue posible actualizar el producto. Intenta nuevamente.'
  )
}

function crearProductoActualizado() {
  return {
    id: props.producto.id,
    nombre: form.nombre.trim(),
    descripcion: form.descripcion?.trim() || '',
    precio: Number(form.precio),
    enOferta: Boolean(form.enOferta),
    precioOferta: form.enOferta
      ? Number(form.precioOferta)
      : null,
    imagen: form.imagen?.trim() || '',
    categoriaId: Number(form.categoriaId),
    categoriaNombre: form.categoriaNombre?.trim() || '',
  }
}

async function onSubmit() {
  // Evita múltiples solicitudes PUT por doble clic.
  if (guardando.value) return

  mensajeError.value = ''
  mensajeExito.value = ''

  if (!validar()) {
    mensajeError.value =
      'Revisa los campos marcados antes de guardar.'
    return
  }

  guardando.value = true

  try {
    const productoActualizado = crearProductoActualizado()

    const actualizado = await store.actualizar(
      props.producto.id,
      productoActualizado,
    )

    mensajeExito.value = 'Producto actualizado correctamente.'

    // Permite que el usuario vea la confirmación antes de cerrar.
    await new Promise((resolve) => setTimeout(resolve, 800))

    emit('actualizado', actualizado)
  } catch (error) {
    mensajeError.value = obtenerMensajeError(error)
    console.error('Error al actualizar el producto:', error)
  } finally {
    guardando.value = false
  }
}

function cancelarEdicion() {
  if (guardando.value) return

  emit('cancelar')
}
</script>

<template>
  <form
    class="d-flex flex-column gap-3"
    @submit.prevent="onSubmit"
  >
    <!-- Encabezado -->
    <div>
      <h2 class="h4 mb-1">Editar producto</h2>

      <p class="text-muted mb-0">
        Modifica la información del producto
        <strong>#{{ producto.id }}</strong>.
      </p>
    </div>

    <!-- Mensaje de error -->
    <div
      v-if="mensajeError"
      class="alert alert-danger mb-0"
      role="alert"
      aria-live="assertive"
    >
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ mensajeError }}
    </div>

    <!-- Mensaje de éxito -->
    <div
      v-if="mensajeExito"
      class="alert alert-success mb-0"
      role="status"
      aria-live="polite"
    >
      <i class="bi bi-check-circle-fill me-2"></i>
      {{ mensajeExito }}
    </div>

    <!-- Nombre -->
    <div>
      <label for="nombreEdit" class="form-label">
        Nombre
      </label>

      <input
        id="nombreEdit"
        v-model="form.nombre"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errores.nombre }"
        :disabled="guardando"
        autocomplete="off"
      />

      <div
        v-if="errores.nombre"
        class="invalid-feedback"
      >
        {{ errores.nombre }}
      </div>
    </div>

    <!-- Descripción -->
    <div>
      <label for="descripcionEdit" class="form-label">
        Descripción
      </label>

      <textarea
        id="descripcionEdit"
        v-model="form.descripcion"
        class="form-control"
        rows="3"
        :disabled="guardando"
      ></textarea>
    </div>

    <!-- Precio y categoría -->
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <label for="precioEdit" class="form-label">
          Precio
        </label>

        <div class="input-group">
          <span class="input-group-text">Q</span>

          <input
            id="precioEdit"
            v-model.number="form.precio"
            type="number"
            min="0.01"
            step="0.01"
            class="form-control"
            :class="{ 'is-invalid': errores.precio }"
            :disabled="guardando"
          />

          <div
            v-if="errores.precio"
            class="invalid-feedback"
          >
            {{ errores.precio }}
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <label for="categoriaIdEdit" class="form-label">
          Categoría (ID)
        </label>

        <input
          id="categoriaIdEdit"
          v-model.number="form.categoriaId"
          type="number"
          min="1"
          step="1"
          class="form-control"
          :class="{ 'is-invalid': errores.categoriaId }"
          :disabled="guardando"
        />

        <div
          v-if="errores.categoriaId"
          class="invalid-feedback"
        >
          {{ errores.categoriaId }}
        </div>
      </div>
    </div>

    <!-- Nombre de categoría -->
    <div>
      <label for="categoriaNombreEdit" class="form-label">
        Nombre de categoría
      </label>

      <input
        id="categoriaNombreEdit"
        v-model="form.categoriaNombre"
        type="text"
        class="form-control"
        :disabled="guardando"
        autocomplete="off"
      />
    </div>

    <!-- Oferta -->
    <div class="form-check form-switch">
      <input
        id="enOfertaEdit"
        v-model="form.enOferta"
        class="form-check-input"
        type="checkbox"
        role="switch"
        :disabled="guardando"
      />

      <label
        class="form-check-label"
        for="enOfertaEdit"
      >
        Producto en oferta
      </label>
    </div>

    <!-- Precio de oferta -->
    <div v-if="form.enOferta">
      <label for="precioOfertaEdit" class="form-label">
        Precio de oferta
      </label>

      <div class="input-group">
        <span class="input-group-text">Q</span>

        <input
          id="precioOfertaEdit"
          v-model.number="form.precioOferta"
          type="number"
          min="0.01"
          step="0.01"
          class="form-control"
          :class="{ 'is-invalid': errores.precioOferta }"
          :disabled="guardando"
        />

        <div
          v-if="errores.precioOferta"
          class="invalid-feedback"
        >
          {{ errores.precioOferta }}
        </div>
      </div>
    </div>

    <!-- URL de imagen -->
    <div>
      <label for="imagenEdit" class="form-label">
        URL de imagen
      </label>

      <input
        id="imagenEdit"
        v-model="form.imagen"
        type="url"
        class="form-control"
        :disabled="guardando"
        placeholder="https://ejemplo.com/imagen.jpg"
      />
    </div>

    <!-- Acciones -->
    <div class="d-flex flex-column flex-sm-row gap-2">
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="guardando"
      >
        <span
          v-if="guardando"
          class="spinner-border spinner-border-sm me-2"
          aria-hidden="true"
        ></span>

        <i
          v-else
          class="bi bi-floppy me-1"
        ></i>

        {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
      </button>

      <button
        type="button"
        class="btn btn-outline-secondary"
        :disabled="guardando"
        @click="cancelarEdicion"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>