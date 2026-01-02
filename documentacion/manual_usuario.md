# Manual de Usuario - Sublimación App

## Bienvenido 👋

Esta aplicación te permite diseñar camisetas personalizadas de forma sencilla y profesional. Visualiza tu diseño en tiempo real, ajusta dimensiones con precisión y exporta reportes técnicos para el proceso de sublimación.

## Navegación

### Páginas Principales

- **Inicio** (`/`): Página principal de la aplicación
- **Tienda** (`/tienda`): Explora productos disponibles
- **Diseñador** (`/disenador`): Crea y personaliza tus diseños

Usa el menú superior para navegar entre páginas.

## Diseñar una Camiseta

### 1. Seleccionar el Modelo

En la pestaña **👕 Prenda**:

- Elige entre los modelos predefinidos (Blanca, Negra)
- O sube tu propia imagen de camiseta (formato PNG recomendado)

### 2. Subir tu Diseño

En la pestaña **🎨 Diseño**:

1. Haz clic en **"Seleccionar archivo"** o arrastra tu imagen
2. Formatos aceptados: PNG, JPG, JPEG, SVG
3. Tamaño máximo: 10MB

### 3. Ajustar Tamaño

Usa el slider **"Tamaño del diseño"** para redimensionar:
- Mínimo: 10% (muy pequeño)
- Máximo: 300% (muy grande)
- Las dimensiones en centímetros se muestran en tiempo real

### 4. Posicionar el Diseño

**En computadora:**
- Haz clic y arrastra la imagen a la posición deseada
- Verás las coordenadas en centímetros mientras arrastras

**En móvil/tablet:**
- Toca y arrastra con un dedo para mover
- Pellizca sobre la imagen con dos dedos para redimensionar

### 5. Ajustar la Vista

En la pestaña **🔍 Vista**:

**Zoom del Lienzo:**
- Usa el slider para acercar/alejar la vista
- O usa `Ctrl + Scroll` del mouse (solo sobre el canvas)
- Atajos de teclado:
  - `Ctrl + +` → Acercar
  - `Ctrl + -` → Alejar
  - `Ctrl + 0` → Resetear al 100%

### 6. Exportar a PDF

Cuando estés satisfecho con tu diseño:

1. Ve a la pestaña **🔍 Vista**
2. Haz clic en **"📑 Exportar PDF"**
3. El archivo se descargará automáticamente

El PDF incluye:
- Imagen del diseño final sobre la camiseta
- Cuadrícula de referencia (líneas cada 1cm y 5cm)
- Especificaciones técnicas:
  - Modelo de camiseta
  - Dimensiones del diseño (ancho x alto en cm)
  - Posición (coordenadas X, Y en cm)
- Fecha de generación

## Gestos Táctiles (Móvil)

### Sobre el Diseño
- **Un dedo**: Arrastra para mover
- **Dos dedos (pellizco)**: Redimensiona la imagen

### Sobre el Fondo del Canvas
- **Dos dedos (pellizco)**: Zoom del lienzo completo

### Sobre los Controles
- **Toca el diseño**: Oculta los controles para mejor visualización
- **Toca el fondo**: Muestra los controles nuevamente

## Cuadrícula de Referencia

La cuadrícula te ayuda a posicionar con precisión:

- **Líneas finas**: Cada 1 centímetro
- **Líneas gruesas**: Cada 5 centímetros
- Base: 50cm de ancho total del lienzo

La cuadrícula se activa automáticamente al arrastrar y aparece en el PDF exportado.

## Consejos y Buenas Prácticas

### Para Mejores Resultados

1. **Usa imágenes de alta resolución** (mínimo 300 DPI)
2. **Formato PNG con fondo transparente** para diseños sin fondo
3. **Verifica las dimensiones** antes de exportar
4. **Guarda el PDF** como referencia para el proceso de sublimación

### Limitaciones

- El diseño debe estar dentro del **área de impresión** (zona central de la camiseta)
- Si intentas mover el diseño fuera, se limitará automáticamente
- Tamaño de archivo máximo: 10MB

## Solución de Problemas

### La imagen no se carga
- Verifica que el formato sea compatible (PNG, JPG, JPEG, SVG)
- Asegúrate de que el archivo no exceda 10MB
- Intenta con otra imagen

### El zoom no funciona
- Asegúrate de mantener presionada la tecla `Ctrl`
- En móvil, usa el pellizco con dos dedos sobre el fondo del canvas
- Verifica que el cursor esté sobre el área del diseñador

### El PDF se ve distorsionado
- Espera a que la imagen cargue completamente antes de exportar
- Intenta resetear el zoom a 100% antes de exportar
- Si persiste, recarga la página e intenta nuevamente

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + +` | Aumentar zoom |
| `Ctrl + -` | Disminuir zoom |
| `Ctrl + 0` | Resetear zoom |
| `Ctrl + Scroll` | Zoom con rueda del mouse |

## Soporte

¿Tienes preguntas o encontraste un problema?

- Revisa la documentación técnica en `/documentacion`
- Reporta issues en GitHub
- Contacta al desarrollador

---

**¡Disfruta diseñando tus camisetas! 🎨👕**
