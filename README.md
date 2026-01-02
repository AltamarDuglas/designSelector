# 🎨 Sublimación - Diseñador de Camisetas

Una aplicación web moderna para diseñar y personalizar camisetas mediante sublimación. Permite a los usuarios visualizar sus diseños en tiempo real, ajustar dimensiones con precisión métrica y exportar reportes profesionales en PDF.

## Características Principales

### Diseñador Interactivo
- **Visualización en tiempo real** del diseño sobre diferentes modelos de camisetas
- **Arrastrar y soltar** para posicionar el diseño con precisión
- **Redimensionamiento intuitivo** mediante controles táctiles o sliders
- **Zoom dinámico** del lienzo para trabajar con detalle (Ctrl + scroll o Ctrl +/-)
- **Cuadrícula de referencia** con medidas en centímetros

### Precisión Métrica
- Sistema de medidas basado en **50cm de ancho** del lienzo
- Visualización en tiempo real de **dimensiones y posición** en centímetros
- Límites de área de impresión configurables
- Indicadores flotantes durante el arrastre

### Diseño Mobile-First
- Interfaz optimizada para dispositivos móviles
- **Gestos táctiles avanzados**:
  - Pellizco sobre el diseño → Redimensiona la imagen
  - Pellizco sobre el fondo → Zoom del lienzo
  - Arrastre → Reposiciona el diseño
- Panel de controles con pestañas (Prenda, Diseño, Vista)
- Compatible con **Capacitor** para apps nativas Android/iOS

### Exportación Profesional
- Generación de **reportes PDF** con:
  - Imagen del diseño final sobre la camiseta
  - Cuadrícula de referencia visible
  - Especificaciones técnicas (modelo, dimensiones, posición)
  - Metadatos (fecha de generación)

### Arquitectura Multi-Página
- **Inicio**: Página principal
- **Tienda**: Catálogo de productos (en desarrollo)
- **Diseñador**: Herramienta completa de personalización
- Navegación fluida con React Router

## Tecnologías

- **React 18** + **TypeScript** - Framework y tipado estático
- **Vite** - Build tool ultrarrápido
- **React Router** - Navegación entre páginas
- **jsPDF** + **html2canvas** - Generación de PDFs
- **CSS Variables** - Sistema de diseño consistente

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AltamarDuglas/designSelector.git
cd designSelector

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Uso

### Diseñar una Camiseta

1. **Seleccionar modelo**: Elige entre camisetas blanca, negra, o sube tu propio modelo
2. **Subir diseño**: Carga tu imagen (PNG, JPG, JPEG, SVG)
3. **Ajustar posición**: Arrastra el diseño a la ubicación deseada
4. **Redimensionar**: Usa el slider o pellizca sobre la imagen (móvil)
5. **Zoom**: Ajusta la vista con Ctrl + scroll o el control de zoom
6. **Exportar**: Genera el PDF desde la pestaña "Vista"

### Atajos de Teclado

- `Ctrl + +` / `Ctrl + -` → Aumentar/Disminuir zoom
- `Ctrl + 0` → Resetear zoom a 100%
- `Ctrl + Scroll` → Zoom (solo sobre el canvas)

## Estructura del Proyecto

```
src/
├── paginas/              # Páginas de la aplicación
│   ├── Inicio.tsx       # Landing page
│   ├── Tienda.tsx       # Catálogo
│   └── Disenador.tsx    # Diseñador de camisetas
├── componentes/
│   ├── navegacion/      # Header, Footer
│   └── disenador/       # Componentes del diseñador
│       ├── CanvasCamiseta.tsx
│       ├── SelectorModelo.tsx
│       ├── SubidorImagen.tsx
│       ├── ControlesTamaño.tsx
│       └── ControlesZoom.tsx
├── utilidades/
│   ├── constantes.ts    # Configuración y constantes
│   └── generadorPDF.ts  # Lógica de exportación PDF
├── tipos/
│   └── index.ts         # Definiciones TypeScript
└── App.tsx              # Router principal
```

## Configuración

### Modelos de Camisetas

Edita `src/utilidades/constantes.ts` para añadir nuevos modelos:

```typescript
export const MODELOS_DISPONIBLES = [
  {
    id: 'blanca',
    nombre: 'Camiseta Blanca',
    rutaImagen: '/modelos/camiseta-blanca.png',
    colorFondo: '#f0f0f0'
  },
  // Añade más modelos aquí
];
```

### Área de Impresión

Ajusta los límites del área imprimible:

```typescript
export const LIMITES_AREA_IMPRESION = {
  superior: 15,    // % desde arriba
  inferior: 85,    // % desde arriba
  izquierdo: 25,   // % desde izquierda
  derecho: 75      // % desde izquierda
};
```

## Despliegue

### Build de Producción

```bash
npm run build
```

Los archivos optimizados se generarán en `dist/`

### Capacitor (Móvil)

Para compilar como app nativa:

```bash
# Instalar Capacitor
npm install @capacitor/core @capacitor/cli

# Inicializar
npx cap init

# Añadir plataforma
npx cap add android
npx cap add ios

# Build y sincronizar
npm run build
npx cap sync
```

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## Autores

**Duglas Altamar**

- GitHub: [@AltamarDuglas](https://github.com/AltamarDuglas)

## Agradecimientos

- Iconos de emoji para una interfaz más amigable
- Comunidad de React y TypeScript por las herramientas increíbles
- Usuarios beta por el feedback valioso

---

**Hecho con ❤️ para simplificar el proceso de sublimación**
