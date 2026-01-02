# Registro de Cambios y Arquitectura

Este documento detalla las mejoras técnicas implementadas en la aplicación de personalización.

## Mejoras Recientes

### Sistema Métrico (Centímetros)
Se ha implementado una escala de conversión real. El lienzo de trabajo representa un ancho físico de **50 cm**, permitiendo que todos los cálculos de posición y tamaño se traduzcan a medidas métricas reales necesarias para el proceso de impresión.

### Cuadrícula de Precisión Dinámica
La cuadrícula ahora está calibrada por centímetros:
- **Líneas finas**: Cada 1 cm.
- **Líneas de referencia**: Cada 5 cm.
- **Comportamiento**: La cuadrícula permanece tenue para no estorbar la visualización y se resalta automáticamente cuando el usuario comienza a manipular un diseño, facilitando la alineación técnica.

### Máscaras de Recorte Dinámicas
Se utiliza la propiedad `mask-image` de CSS para proyectar el diseño únicamente sobre la silueta de la prenda activa. Esta funcionalidad es compatible tanto con modelos fijos como con camisetas personalizadas subidas por el usuario.

## Estructura del Proyecto

- `src/componentes/CanvasCamiseta.tsx`: Motor principal de previsualización y lógica de arrastre.
- `src/utilidades/constantes.ts`: Configuración central de límites, escalas y parámetros métricos.
- `src/tipos/index.ts`: Definiciones de datos para asegurar la integridad de la información en toda la aplicación.
