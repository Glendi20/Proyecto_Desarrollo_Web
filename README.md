# Catálogo de Productos — Frontend

Aplicación Frontend que consume el **BackService** (API REST de productos) para
implementar un CRUD completo con filtros dinámicos, siguiendo los
lineamientos de la actividad práctica.

## Stack tecnológico

- **Framework JS:** [Vue 3](https://vuejs.org/) + [Vite](https://vite.dev/) (Composition API, `<script setup>`)
- **Framework CSS:** [Bootstrap 5](https://getbootstrap.com/) + Bootstrap Icons
- **Enrutamiento:** Vue Router
- **Estado global:** Pinia
- **Peticiones HTTP:** Axios

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior (recomendado 22+)
- npm (viene con Node)

## Puesta en marcha

```bash
npm install       # instalar dependencias (una sola vez)
npm run dev       # levantar servidor de desarrollo (http://localhost:5173)
npm run build     # generar build de producción en /dist
```

La URL base de la API vive en la variable de entorno `VITE_API_BASE_URL`
(archivo `.env`, ya configurada con la URL del BackService). Si necesitas
apuntar a otro backend (por ejemplo local), copia `.env.example` a
`.env.local` y cambia el valor ahí — `.env.local` no se sube al repo.

## Estructura del proyecto

```
src/
├─ assets/                 # imágenes, iconos estáticos
├─ components/             # componentes de UI reutilizables
├─ composables/            # lógica reutilizable (ej. useProductoForm)
├─ router/                 # definición de rutas (Vue Router)
├─ services/               # capa de acceso a la API (axios + productoService)
├─ stores/                 # estado global (Pinia)
├─ utils/                  # funciones puras (categorías DISTINCT, filtros)
├─ views/                  # vistas/páginas montadas por el router
├─ App.vue                 # shell general (navbar + router-view)
├─ main.js                 # bootstrap de la app (Vue, Pinia, Router, Bootstrap CSS)
└─ style.css               # estilos globales / overrides sobre Bootstrap
```

**Regla de oro:** los componentes NO llaman a `axios` directamente. Todo pasa
por `src/services/productoService.js` → `src/stores/productos.js` → componentes.
Así evitamos que cada quien maneje su propio fetch descoordinado.

## API consumida (BackService)

```
Base: https://backservicetest-g8emcvdff0fqe2b8.canadacentral-01.azurewebsites.net/api/producto

GET    /producto        → listado completo
GET    /producto/{id}   → detalle por id
POST   /producto        → crear (Content-Type: application/json)
PUT    /producto/{id}   → actualizar (Content-Type: application/json)
DELETE /producto/{id}   → eliminar
```

Objeto `Producto`:

```json
{
  "id": 101,
  "nombre": "Auriculares Bluetooth",
  "descripcion": "Auriculares inalámbricos con cancelación de ruido.",
  "precio": 45.99,
  "enOferta": true,
  "precioOferta": 35.99,
  "imagen": "https://placehold.co/300x200?text=Auriculares",
  "categoriaId": 1,
  "categoriaNombre": "Electrónica"
}
```

## Distribución de roles y dónde trabajar cada quien

Cada bloque indica **qué archivos ya existen como base/stub** para esa
tarea y qué falta por completar (buscar comentarios `TODO` con tu nombre).

### 1. Anthony Martínez — Setup + Listado (GET) ✅
- `src/components/ProductoCard.vue`, `src/components/ProductoList.vue`
- `src/stores/productos.js` (acción `fetchProductos`, ya conectada)
- `src/components/Loader.vue` (spinner ya listo, ajustar mensaje/posición si hace falta)
- Layout general del grid en `ProductoList.vue`

### 2. Anthony Ríos — Detalle (GET por id) + errores globales ✅
- `src/components/ProductoDetalleModal.vue`
- `src/views/ProductoDetalleView.vue` (alternativa por ruta, opcional)
- `src/components/ErrorMessage.vue`
- `src/services/api.js` (interceptor de errores, ya normaliza `{status, message}`)
- `src/router/index.js` si se necesita más navegación

### 3. César Chamo — Creación (POST) ✅
- `src/components/ProductoFormCreate.vue`
- `src/composables/useProductoForm.js` (validaciones compartidas con Eddy)
- `src/stores/productos.js` (acción `crear`, ya conectada)

### 4. Eddy Castro — Edición (PUT) ✅
- `src/components/ProductoFormEdit.vue`
- Mismo composable `useProductoForm.js` que César (evita duplicar validaciones)
- `src/stores/productos.js` (acción `actualizar`, ya conectada)

### 5. Esaú Mendoza — Eliminación (DELETE) + categorías dinámicas (DISTINCT) ✅
- `src/components/ConfirmDeleteModal.vue` — modal de confirmación con estado
  de carga (`loading`) y mensaje de error propio.
- `src/stores/productos.js` (acción `eliminar`, ya conectada)
- **Pieza clave (implementada):** `src/utils/categorias.js`. El DISTINCT ya
  no es solo por `categoriaId` — usa una **clave compuesta**
  `categoriaId::categoriaNombreNormalizado` (`crearClaveCategoria()`) porque
  el BackService de pruebas tiene el mismo `categoriaId` con nombres
  inconsistentes entre equipos. Para cada clave se queda con la variante de
  nombre más frecuente, y si dos categorías distintas terminan con el mismo
  nombre visible (ej. "Electrónica" en dos `categoriaId` distintos), el menú
  las distingue mostrando `(ID 1)` / `(ID 3)`. Esta es la lógica que hay que
  poder explicar en la Diapositiva 2.
- `src/components/CategoriaMenu.vue` (UI del menú, filtra por `categoria.clave`)

### 6. Maryori Fajardo — Búsqueda y filtros combinados ✅
- `src/components/SearchBar.vue` — búsqueda reactiva con **debounce de
  300ms** y botón de limpiar.
- `src/components/FiltroOferta.vue` — switch "solo en oferta".
- **Pieza clave (implementada):** `src/utils/filtros.js` → `aplicarFiltros()`
  combina nombre + categoría (por `categoriaClave`, coordinado con la clave
  compuesta de Esaú) + oferta al mismo tiempo.
- `src/views/HomeView.vue` (objeto `criterios: { nombre, categoriaClave, soloOferta }`)

### 7. Glendi Campos — UX/UI, responsive e indicadores de oferta ✅
- `src/components/OfertaBadge.vue` (comparación precio original vs. oferta)
- `src/style.css` (overrides globales sobre Bootstrap)
- `src/App.vue` (navbar y shell general)
- Revisión general de breakpoints (`ProductoList.vue`, formularios, modales)
  y estados de carga/error a nivel visual.

## Flujo de trabajo en Git sugerido

1. Trabaja en una rama por tarea: `git checkout -b feature/listado-productos`
   (o `feature/<tu-nombre>-<tarea>`).
2. Haz commits pequeños y descriptivos.
3. Abre un Pull Request hacia `main` para que el equipo revise antes de
   integrar (evita subir directo a `main`).
4. Si tu tarea depende de otra (ej. Eddy depende del composable de César),
   avisa en el chat del equipo antes de empezar para evitar choques.

## Pendientes generales (no asignados a un rol específico)

- Definir paleta de colores / branding si se quiere personalizar Bootstrap
  (opcional, no bloqueante).
- Los 7 roles están implementados y probados en vivo contra el BackService
  real (listado, detalle, crear, editar, eliminar, categorías dinámicas,
  búsqueda, filtros combinados, responsive, estados de carga/error).
- El BackService es una base de datos de pruebas **compartida entre
  equipos**: es normal ver productos/categorías con datos inconsistentes
  (nombres raros, precios de oferta mayores al original, imágenes rotas).
  No es un bug del frontend.
