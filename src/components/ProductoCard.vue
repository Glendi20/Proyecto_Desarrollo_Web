<script setup>
import OfertaBadge from '@/components/OfertaBadge.vue'

// ROL: Anthony Martínez
// -----------------------------------------------------------------------
// Tarjeta individual de producto, usada dentro de ProductoList.vue.
//
// TODO (Anthony Martínez):
// - Ajustar el layout final (imagen, título, descripción truncada).
// - Emitir "ver-detalle" para abrir ProductoDetalleModal.vue (Anthony Ríos).
// - Coordinar con Eddy/César los botones de Editar/Eliminar si se colocan
//   directamente en la card (o dejarlos solo en la vista de detalle).
defineProps({
  producto: { type: Object, required: true },
})

const emit = defineEmits(['ver-detalle', 'editar', 'eliminar'])
</script>

<template>
  <div class="card h-100 shadow-sm">
    <img
      :src="producto.imagen"
      :alt="producto.nombre"
      class="card-img-top"
      style="object-fit: cover; height: 180px"
    />
    <div class="card-body d-flex flex-column">
      <span class="badge bg-secondary align-self-start mb-1">
        {{ producto.categoriaNombre }}
      </span>
      <h5 class="card-title">{{ producto.nombre }}</h5>
      <p class="card-text text-muted small flex-grow-1">
        {{ producto.descripcion }}
      </p>

      <!-- Comparación precio original vs. oferta (rol: Glendi Campos) -->
      <OfertaBadge
        :precio="producto.precio"
        :precio-oferta="producto.precioOferta"
        :en-oferta="producto.enOferta"
      />

      <div class="d-flex gap-2 mt-3">
        <button class="btn btn-sm btn-outline-primary" @click="emit('ver-detalle', producto.id)">
          Ver detalle
        </button>
        <button class="btn btn-sm btn-outline-secondary" @click="emit('editar', producto)">
          Editar
        </button>
        <button class="btn btn-sm btn-outline-danger" @click="emit('eliminar', producto)">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
