// ROL: Esaú Mendoza
// -----------------------------------------------------------------------
// El backend no proporciona un endpoint independiente de categorías.
//
// El DISTINCT se construye usando la combinación:
// categoriaId + categoriaNombre.
//
// Esto permite conservar categorías distintas aunque compartan el mismo
// ID o aunque tengan el mismo nombre asociado a IDs diferentes.

export function limpiarNombreCategoria(nombre) {
  return String(nombre ?? '')
    .trim()
    .replace(/\s+/g, ' ')
}

export function normalizarNombreCategoria(nombre) {
  return limpiarNombreCategoria(nombre)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
}

export function crearClaveCategoria(categoriaId, categoriaNombre) {
  const nombreNormalizado =
    normalizarNombreCategoria(categoriaNombre)

  const idValido =
    categoriaId !== null &&
    categoriaId !== undefined &&
    categoriaId !== ''

  if (!idValido || !nombreNormalizado) {
    return ''
  }

  return `${String(categoriaId)}::${nombreNormalizado}`
}

export function extraerCategorias(productos = []) {
  const categoriasAgrupadas = new Map()

  // Recorremos todos los productos obtenidos mediante GET.
  for (const producto of productos) {
    const categoriaId = producto?.categoriaId
    const categoriaNombre =
      limpiarNombreCategoria(producto?.categoriaNombre)

    const clave = crearClaveCategoria(
      categoriaId,
      categoriaNombre,
    )

    // Se descartan categorías sin ID o con nombre vacío.
    if (!clave) continue

    if (!categoriasAgrupadas.has(clave)) {
      categoriasAgrupadas.set(clave, {
        id: categoriaId,
        clave,
        variantes: new Map(),
      })
    }

    const categoria = categoriasAgrupadas.get(clave)

    const cantidadActual =
      categoria.variantes.get(categoriaNombre) ?? 0

    categoria.variantes.set(
      categoriaNombre,
      cantidadActual + 1,
    )
  }

  const categorias = Array.from(
    categoriasAgrupadas.values(),
    (categoria) => {
      // Conserva la variante escrita con mayor frecuencia.
      // Ejemplo: "Comida Rápida" frente a "Comida Rapida".
      const variantesOrdenadas = Array.from(
        categoria.variantes,
        ([nombre, cantidad]) => ({
          nombre,
          cantidad,
        }),
      ).sort(
        (a, b) =>
          b.cantidad - a.cantidad ||
          a.nombre.localeCompare(b.nombre, 'es'),
      )

      return {
        id: categoria.id,
        nombre: variantesOrdenadas[0].nombre,
        clave: categoria.clave,
      }
    },
  )

  // Cuenta cuántas categorías tienen visualmente el mismo nombre.
  const cantidadPorNombre = new Map()

  for (const categoria of categorias) {
    const nombreNormalizado =
      normalizarNombreCategoria(categoria.nombre)

    cantidadPorNombre.set(
      nombreNormalizado,
      (cantidadPorNombre.get(nombreNormalizado) ?? 0) + 1,
    )
  }

  // Si el mismo nombre pertenece a IDs diferentes, muestra el ID
  // para que el usuario pueda distinguir cada botón del menú.
  const categoriasConNombreVisible = categorias.map(
    (categoria) => {
      const nombreNormalizado =
        normalizarNombreCategoria(categoria.nombre)

      const nombreRepetido =
        cantidadPorNombre.get(nombreNormalizado) > 1

      return {
        ...categoria,
        nombreVisible: nombreRepetido
          ? `${categoria.nombre} (ID ${categoria.id})`
          : categoria.nombre,
      }
    },
  )

  return categoriasConNombreVisible.sort(
    (a, b) =>
      a.nombreVisible.localeCompare(
        b.nombreVisible,
        'es',
      ) ||
      String(a.id).localeCompare(String(b.id), 'es', {
        numeric: true,
      }),
  )
}