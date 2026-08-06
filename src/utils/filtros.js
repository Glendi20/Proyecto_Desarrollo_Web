// ROL: Maryori Fajardo
// Ajuste de compatibilidad con categorías compuestas: Esaú Mendoza
// -----------------------------------------------------------------------
// Aplica simultáneamente los filtros de:
// - Nombre.
// - Categoría.
// - Productos en oferta.
//
// La categoría se identifica mediante una clave formada por:
// categoriaId + categoriaNombre normalizado.
//
// Esto evita mezclar productos cuando un mismo categoriaId está asociado
// a nombres diferentes dentro de la API compartida.

import { crearClaveCategoria } from '@/utils/categorias'

export function aplicarFiltros(productos = [], criterios = {}) {
  const {
    nombre = '',
    categoriaClave = null,
    soloOferta = false,
  } = criterios

  const nombreNormalizado = String(nombre)
    .trim()
    .toLocaleLowerCase('es')

  const hayCategoriaSeleccionada =
    categoriaClave !== null &&
    categoriaClave !== undefined &&
    categoriaClave !== ''

  return productos.filter((producto) => {
    const nombreProducto = String(producto?.nombre ?? '')
      .toLocaleLowerCase('es')

    const coincideNombre = nombreNormalizado
      ? nombreProducto.includes(nombreNormalizado)
      : true

    const claveDelProducto = crearClaveCategoria(
      producto?.categoriaId,
      producto?.categoriaNombre,
    )

    const coincideCategoria = hayCategoriaSeleccionada
      ? claveDelProducto === categoriaClave
      : true

    const coincideOferta = soloOferta
      ? producto?.enOferta === true
      : true

    return (
      coincideNombre &&
      coincideCategoria &&
      coincideOferta
    )
  })
}