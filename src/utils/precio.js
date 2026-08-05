// ROL: Glendi Campos
// -----------------------------------------------------------------------
// Helpers de formato/cálculo de precio, compartidos entre OfertaBadge.vue
// y RibbonOferta.vue para no duplicar la fórmula del % de descuento.
const formateador = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'USD',
})

/** Formatea un número como moneda ($ 45.99). Tolera null/undefined/strings. */
export function formatearPrecio(valor) {
  const numero = Number(valor)
  return formateador.format(Number.isFinite(numero) ? numero : 0)
}

/** % de descuento redondeado. Devuelve 0 si faltan datos o el precio de oferta no es menor. */
export function calcularDescuento(precio, precioOferta) {
  const original = Number(precio)
  const oferta = Number(precioOferta)
  if (!original || !oferta || oferta >= original) return 0
  return Math.round(100 - (oferta / original) * 100)
}
