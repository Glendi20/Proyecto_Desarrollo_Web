// ROL: Esaú Mendoza
// -----------------------------------------------------------------------
// El backend NO tiene endpoint de categorías. Esta función recibe el
// arreglo completo de productos (GET /producto) y extrae los valores
// ÚNICOS (DISTINCT) de categoriaId + categoriaNombre para construir el
// menú dinámico de navegación (CategoriaMenu.vue).
//
// Esta es la pieza que se pregunta explícitamente en la Diapositiva 2,
// así que debes poder explicar el algoritmo con claridad:
//
// 1. Recorremos el arreglo de productos.
// 2. Usamos un Map con categoriaId como clave: así, aunque haya 50
//    productos con categoriaId = 1, solo queda UNA entrada por id
//    (equivalente a un SELECT DISTINCT categoriaId, categoriaNombre).
// 3. Convertimos el Map a un arreglo de objetos { id, nombre } y lo
//    ordenamos alfabéticamente para que el menú sea predecible.
//
// Devuelve: [{ id: 1, nombre: 'Electrónica' }, { id: 2, nombre: 'Hogar' }, ...]
export function extraerCategorias(productos = []) {
  const mapaCategorias = new Map()

  for (const producto of productos) {
    const { categoriaId, categoriaNombre } = producto
    if (categoriaId == null) continue
    if (!mapaCategorias.has(categoriaId)) {
      mapaCategorias.set(categoriaId, categoriaNombre ?? 'Sin categoría')
    }
  }

  return Array.from(mapaCategorias, ([id, nombre]) => ({ id, nombre }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
}
