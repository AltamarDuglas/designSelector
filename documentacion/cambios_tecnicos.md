# Cambios Técnicos - Sublimación App

## Versión 2.0.0 - Reestructuración Multi-Página

### Arquitectura
- **Migración a React Router**: Implementación de navegación multi-página
- **Separación de responsabilidades**: Diseñador ahora es una página independiente
- **Estructura modular**: Componentes organizados por funcionalidad

### Nuevas Páginas
- `/` - Página de inicio
- `/tienda` - Catálogo de productos (placeholder)
- `/disenador` - Herramienta de diseño de camisetas

### Componentes de Navegación
- **Header**: Barra de navegación sticky con links a todas las páginas
- Diseño mobile-first con tipografía responsive
- Gradientes en logo para identidad visual

### Optimizaciones Móviles
- Header optimizado para pantallas pequeñas
- Uso de `clamp()` para escalado fluido de texto
- Touch-friendly: Botones con tamaño mínimo adecuado
- Compatible con Capacitor para apps nativas

## Versión 1.5.0 - Exportación PDF

### Funcionalidad
- **Generación de PDFs profesionales** con jsPDF y html2canvas
- Captura del diseño con cuadrícula de referencia visible
- Especificaciones técnicas incluidas (modelo, dimensiones, posición)

### Implementación
- Clonado del DOM para captura limpia sin afectar UI
- Reset temporal de zoom para evitar distorsiones
- Forzado de visibilidad de cuadrícula en el reporte
- Layout responsive del PDF con espaciado dinámico

### Correcciones
- Aspect ratio 3:4 forzado para evitar imágenes estiradas
- Cuadrícula con opacidad optimizada (0.5) para visibilidad
- Separación de eventos de teclado y wheel para zoom selectivo

## Versión 1.0.0 - Diseñador Base

### Características Principales
- Canvas interactivo con drag & drop
- Sistema de zoom con Ctrl + scroll
- Gestos táctiles avanzados (pellizco para escalar/zoom)
- Cuadrícula de referencia métrica
- Panel de controles con pestañas móviles

### Sistema Métrico
- Base: 50cm de ancho del lienzo
- Conversión automática de porcentajes a centímetros
- Indicadores flotantes durante arrastre
- Límites de área de impresión configurables

### Gestión de Estado
- React hooks (useState, useEffect, useRef)
- Refs para evitar stale closures en event listeners
- Separación de modos de pellizco (zoom vs escala)

### Optimizaciones
- `isolation: isolate` en canvas para contener zoom
- Event listeners condicionales (solo en canvas para wheel)
- Lazy loading de imágenes
- Will-change para animaciones suaves

## Tecnologías Utilizadas

- **React 18.3**: Framework principal
- **TypeScript 5.6**: Tipado estático
- **Vite 6.0**: Build tool
- **React Router 7.1**: Navegación
- **jsPDF 2.5**: Generación de PDFs
- **html2canvas 1.4**: Captura de DOM

## Próximas Mejoras

- [ ] Implementar catálogo de productos en `/tienda`
- [ ] Sistema de autenticación de usuarios
- [ ] Guardado de diseños en localStorage/backend
- [ ] Galería de diseños prediseñados
- [ ] Integración con servicios de impresión
- [ ] Modo oscuro/claro
- [ ] Internacionalización (i18n)
