// ROL: Maryori Fajardo
// -----------------------------------------------------------------------
// Lógica de filtrado combinado sobre el catálogo (Frontend puro, ya que
// el backend no expone query params de búsqueda/filtro).
//
// Recibe el arreglo completo de productos + un objeto de criterios y
// devuelve el subconjunto que cumple TODOS los criterios activos a la vez
// (nombre + categoría + solo oferta). Un criterio "vacío" (null, '', o
// undefined) se ignora, es decir, no restringe el resultado.
//
// criterios = {
//   nombre: string,        // búsqueda en tiempo real (SearchBar.vue)
//   categoriaId: number|null, // seleccionado en CategoriaMenu.vue
//   soloOferta: boolean,   // checkbox/switch "solo productos en oferta"
// }
export function aplicarFiltros(productos = [], criterios = {}) {
  const { nombre = '', categoriaId = null, soloOferta = false } = criterios

  const nombreNormalizado = nombre.trim().toLowerCase()

  return productos.filter((producto) => {
    const coincideNombre = nombreNormalizado
      ? producto.nombre?.toLowerCase().includes(nombreNormalizado)
      : true

    const coincideCategoria = categoriaId
      ? producto.categoriaId === categoriaId
      : true

    const coincideOferta = soloOferta ? producto.enOferta === true : true

    return coincideNombre && coincideCategoria && coincideOferta
  })
}
