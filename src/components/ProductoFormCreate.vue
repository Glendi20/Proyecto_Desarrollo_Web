<script setup>
// ROL: César Chamo
// -----------------------------------------------------------------------
// Formulario de creación de producto (POST /producto).
// Usa el composable compartido useProductoForm() para validaciones
// (compartido con Eddy Castro / ProductoFormEdit.vue).
//
// TODO (César):
// - Conectar con store.crear(form) al enviar (ver useProductosStore).
// - Feedback visual de éxito/error (toast o alert de Bootstrap) tras
//   el submit; limpiar el formulario si fue exitoso.
// - Revisar tipos de dato antes de enviar (precio/precioOferta como
//   Number, no string, ya que <input type="number"> puede devolver string).
import { useProductoForm } from '@/composables/useProductoForm'
import { useProductosStore } from '@/stores/productos'

const store = useProductosStore()
const { form, errores, validar } = useProductoForm()

const emit = defineEmits(['creado', 'cancelar'])

async function onSubmit() {
  if (!validar()) return
  try {
    const nuevo = await store.crear({ ...form })
    emit('creado', nuevo)
  } catch (err) {
    // TODO (César): mostrar err.message en un alert/toast
    console.error(err)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="d-flex flex-column gap-3">
    <div>
      <label class="form-label">Nombre</label>
      <input v-model="form.nombre" type="text" class="form-control" />
      <div v-if="errores.nombre" class="text-danger small">{{ errores.nombre }}</div>
    </div>

    <div>
      <label class="form-label">Descripción</label>
      <textarea v-model="form.descripcion" class="form-control" rows="3"></textarea>
    </div>

    <div class="row g-3">
      <div class="col">
        <label class="form-label">Precio</label>
        <input v-model.number="form.precio" type="number" step="0.01" class="form-control" />
        <div v-if="errores.precio" class="text-danger small">{{ errores.precio }}</div>
      </div>
      <div class="col">
        <label class="form-label">Categoría (ID)</label>
        <input v-model.number="form.categoriaId" type="number" class="form-control" />
        <div v-if="errores.categoriaId" class="text-danger small">{{ errores.categoriaId }}</div>
      </div>
    </div>

    <div>
      <label class="form-label">Nombre de categoría</label>
      <input v-model="form.categoriaNombre" type="text" class="form-control" />
    </div>

    <div class="form-check form-switch">
      <input id="enOferta" v-model="form.enOferta" class="form-check-input" type="checkbox" role="switch" />
      <label class="form-check-label" for="enOferta">En oferta</label>
    </div>

    <div v-if="form.enOferta">
      <label class="form-label">Precio de oferta</label>
      <input v-model.number="form.precioOferta" type="number" step="0.01" class="form-control" />
      <div v-if="errores.precioOferta" class="text-danger small">{{ errores.precioOferta }}</div>
    </div>

    <div>
      <label class="form-label">URL de imagen</label>
      <input v-model="form.imagen" type="url" class="form-control" />
    </div>

    <div class="d-flex gap-2">
      <button type="submit" class="btn btn-primary">Crear producto</button>
      <button type="button" class="btn btn-outline-secondary" @click="emit('cancelar')">Cancelar</button>
    </div>
  </form>
</template>
