<script setup>
import { ref } from 'vue'
import { useProductoForm } from '@/composables/useProductoForm'
import { useProductosStore } from '@/stores/productos'

const store = useProductosStore()
const { form, errores, validar } = useProductoForm()

const emit = defineEmits(['creado', 'cancelar'])

const cargando = ref(false)
const mensajeExito = ref('')
const mensajeError = ref('')

function limpiarFormulario() {
  form.nombre = ''
  form.descripcion = ''
  form.precio = null
  form.enOferta = false
  form.precioOferta = null
  form.imagen = ''
  form.categoriaId = null
  form.categoriaNombre = ''

  Object.keys(errores).forEach((campo) => {
    errores[campo] = ''
  })
}

async function onSubmit() {
  mensajeExito.value = ''
  mensajeError.value = ''

  if (!validar()) {
    mensajeError.value =
      'Revise los campos marcados antes de registrar el producto.'
    return
  }

  const producto = {
    nombre: form.nombre.trim(),
    descripcion: form.descripcion.trim(),
    precio: Number(form.precio),
    enOferta: Boolean(form.enOferta),
    precioOferta: form.enOferta
      ? Number(form.precioOferta)
      : 0,
    imagen: form.imagen.trim(),
    categoriaId: Number(form.categoriaId),
    categoriaNombre: form.categoriaNombre.trim(),
  }

  try {
    cargando.value = true

    const nuevoProducto = await store.crear(producto)

    mensajeExito.value = 'Producto registrado correctamente.'

    emit('creado', nuevoProducto)

    limpiarFormulario()
  } catch (error) {
    console.error('Error al crear el producto:', error)

    mensajeError.value =
      error?.message ||
      'No fue posible registrar el producto. Verifique la conexión con el servidor.'
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <div class="card border-0 shadow-sm">
    <div class="card-header bg-primary text-white py-3">
      <h2 class="h4 mb-1">Registrar nuevo producto</h2>

      <p class="mb-0 opacity-75">
        Complete la información para agregar un producto al catálogo.
      </p>
    </div>

    <div class="card-body p-4">
      <div
        v-if="mensajeExito"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>Éxito:</strong> {{ mensajeExito }}

        <button
          type="button"
          class="btn-close"
          aria-label="Cerrar"
          @click="mensajeExito = ''"
        ></button>
      </div>

      <div
        v-if="mensajeError"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong>Error:</strong> {{ mensajeError }}

        <button
          type="button"
          class="btn-close"
          aria-label="Cerrar"
          @click="mensajeError = ''"
        ></button>
      </div>

      <form
        class="d-flex flex-column gap-3"
        novalidate
        @submit.prevent="onSubmit"
      >
        <div>
          <label for="nombre" class="form-label">
            Nombre del producto
          </label>

          <input
            id="nombre"
            v-model.trim="form.nombre"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errores.nombre }"
            placeholder="Ejemplo: Auriculares Bluetooth"
            :disabled="cargando"
          />

          <div v-if="errores.nombre" class="invalid-feedback">
            {{ errores.nombre }}
          </div>
        </div>

        <div>
  <label for="descripcion" class="form-label">
    Descripción
  </label>

  <textarea
    id="descripcion"
    v-model.trim="form.descripcion"
    class="form-control"
    :class="{ 'is-invalid': errores.descripcion }"
    rows="3"
    placeholder="Escriba una descripción del producto"
    :disabled="cargando"
  ></textarea>

  <div
    v-if="errores.descripcion"
    class="invalid-feedback"
  >
    {{ errores.descripcion }}
  </div>

  
  </div>

<div class="row g-3">
          <div class="col-md-4">
            <label for="precio" class="form-label">
              Precio original
            </label>

            <input
              id="precio"
              v-model.number="form.precio"
              type="number"
              min="0.01"
              step="0.01"
              class="form-control"
              :class="{ 'is-invalid': errores.precio }"
              placeholder="0.00"
              :disabled="cargando"
            />

            <div v-if="errores.precio" class="invalid-feedback">
              {{ errores.precio }}
            </div>
          </div>

          <div class="col-md-4">
            <label for="categoriaId" class="form-label">
              ID de categoría
            </label>

            <input
              id="categoriaId"
              v-model.number="form.categoriaId"
              type="number"
              min="1"
              step="1"
              class="form-control"
              :class="{ 'is-invalid': errores.categoriaId }"
              placeholder="Ejemplo: 1"
              :disabled="cargando"
            />

            <div
              v-if="errores.categoriaId"
              class="invalid-feedback"
            >
              {{ errores.categoriaId }}
            </div>
          </div>

          <div class="col-md-4">
  <label for="categoriaNombre" class="form-label">
    Nombre de categoría
  </label>

  <input
    id="categoriaNombre"
    v-model.trim="form.categoriaNombre"
    type="text"
    class="form-control"
    :class="{ 'is-invalid': errores.categoriaNombre }"
    placeholder="Ejemplo: Electrónica"
    :disabled="cargando"
  />

  <div
    v-if="errores.categoriaNombre"
    class="invalid-feedback"
  >
    {{ errores.categoriaNombre }}
  </div>
</div>
        </div>

        <div class="form-check form-switch">
          <input
            id="enOferta"
            v-model="form.enOferta"
            class="form-check-input"
            type="checkbox"
            role="switch"
            :disabled="cargando"
          />

          <label class="form-check-label" for="enOferta">
            Producto disponible en oferta
          </label>
        </div>

        <div v-if="form.enOferta">
          <label for="precioOferta" class="form-label">
            Precio de oferta
          </label>

          <input
            id="precioOferta"
            v-model.number="form.precioOferta"
            type="number"
            min="0.01"
            step="0.01"
            class="form-control"
            :class="{ 'is-invalid': errores.precioOferta }"
            placeholder="0.00"
            :disabled="cargando"
          />

          <div
            v-if="errores.precioOferta"
            class="invalid-feedback"
          >
            {{ errores.precioOferta }}
          </div>
        </div>

        <div>
          <label for="imagen" class="form-label">
            URL de la imagen
          </label>
<input
  id="imagen"
  v-model.trim="form.imagen"
  type="url"
  class="form-control"
  :class="{ 'is-invalid': errores.imagen }"
  placeholder="https://ejemplo.com/producto.jpg"
  :disabled="cargando"
/>

<div
  v-if="errores.imagen"
  class="invalid-feedback"
>
  {{ errores.imagen }}
</div>
</div>

        <div v-if="form.imagen">
          <p class="form-label mb-2">Vista previa</p>

          <img
            :src="form.imagen"
            alt="Vista previa del producto"
            class="img-thumbnail"
            style="
              width: 240px;
              height: 160px;
              object-fit: cover;
            "
          />
        </div>

        <div class="d-flex flex-column flex-sm-row gap-2 pt-2">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="cargando"
          >
            <span
              v-if="cargando"
              class="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>

            {{ cargando ? 'Registrando...' : 'Crear producto' }}
          </button>

          <button
            type="button"
            class="btn btn-outline-secondary"
            :disabled="cargando"
            @click="emit('cancelar')"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>