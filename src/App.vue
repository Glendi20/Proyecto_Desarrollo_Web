<script setup>
// Shell general de la app: navbar + router-view + footer.
// ROL principal: Glendi Campos (UX/UI, responsive, pulido visual).
// Anthony Ríos puede tocar este archivo si el detalle se maneja como
// ruta dedicada en vez de modal.
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark sticky-top shadow-sm mb-2">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center gap-2">
        <span>🛒</span>
        <span>
          Catálogo de Productos
          <small class="d-none d-sm-inline text-white-50 fw-normal ms-1">| ofertas y novedades</small>
        </span>
      </router-link>
    </div>
  </nav>

  <router-view />

  <footer class="text-center text-muted small py-4 mt-4 border-top">
    Proyecto académico — Consumo de servicios web asíncronos.
  </footer>
</template>
