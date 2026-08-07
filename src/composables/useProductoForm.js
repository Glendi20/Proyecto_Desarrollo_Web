import { reactive } from 'vue'

// Composable compartido entre ProductoFormCreate.vue (César) y
// ProductoFormEdit.vue (Eddy) para no duplicar la lógica de validación,
// tal como sugiere el lineamiento del proyecto.
//
// `inicial` permite precargar valores (edición) o dejar el formulario
// vacío (creación).
export function useProductoForm(inicial = {}) {
  const form = reactive({
    nombre: inicial.nombre ?? '',
    descripcion: inicial.descripcion ?? '',
    precio: inicial.precio ?? null,
    enOferta: inicial.enOferta ?? false,
    precioOferta: inicial.precioOferta ?? null,
    imagen: inicial.imagen ?? '',
    categoriaId: inicial.categoriaId ?? null,
    categoriaNombre: inicial.categoriaNombre ?? '',
  })

  const errores = reactive({})

function validar() {
  errores.nombre = !form.nombre?.trim()
    ? 'El nombre es obligatorio.'
    : ''

  errores.descripcion = !form.descripcion?.trim()
    ? 'La descripción es obligatoria.'
    : ''

  errores.precio =
    !form.precio || Number(form.precio) <= 0
      ? 'El precio debe ser mayor a 0.'
      : ''

  errores.categoriaId =
    !form.categoriaId
      ? 'La categoría es obligatoria.'
      : ''

  errores.categoriaNombre =
    !form.categoriaNombre?.trim()
      ? 'Debe ingresar el nombre de la categoría.'
      : ''

  errores.imagen =
    !form.imagen?.trim()
      ? 'La imagen es obligatoria.'
      : ''

  errores.precioOferta =
    form.enOferta &&
    (
      !form.precioOferta ||
      Number(form.precioOferta) <= 0 ||
      Number(form.precioOferta) >= Number(form.precio)
    )
      ? 'El precio de oferta debe ser menor al precio original.'
      : ''

  return Object.values(errores).every((mensaje) => !mensaje)
}

  return { form, errores, validar }
}
