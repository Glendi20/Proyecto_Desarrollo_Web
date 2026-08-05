<script setup>
// Shell general de la app: navbar + router-view.
// ROL principal: Glendi Campos (UX/UI, responsive, pulido visual).
// Anthony Ríos puede tocar este archivo si el detalle se maneja como
// ruta dedicada en vez de modal.
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark mb-2">
    <div class="container">
      <router-link to="/" class="navbar-brand">🛒 Catálogo de Productos</router-link>
    </div>
  </nav>

  <router-view />
</template>
