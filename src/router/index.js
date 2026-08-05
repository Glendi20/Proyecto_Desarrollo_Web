import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Rutas base. HomeView concentra listado + filtros + categorías.
// La vista de detalle es opcional: por defecto el detalle se muestra en
// un modal (ProductoDetalleModal.vue) sin cambiar de ruta, pero se deja
// la ruta /producto/:id lista por si el equipo prefiere navegar a una
// vista dedicada en vez de modal (rol: Anthony Ríos, ver comentario en
// ProductoDetalleModal.vue).
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/producto/:id',
    name: 'producto-detalle',
    component: () => import('@/views/ProductoDetalleView.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
