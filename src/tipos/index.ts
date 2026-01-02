/**
 * TIPOS - SUBLIMACIÓN
 * 
 * Definiciones TypeScript para el sistema de personalización de camisetas
 */

/**
 * Modelo de camiseta disponible
 */
export type ModeloCamiseta = 'blanca' | 'negra' | 'personalizado';

/**
 * Información del modelo de camiseta
 */
export interface InfoModelo {
    id: ModeloCamiseta;
    nombre: string;
    rutaImagen: string;
    colorFondo: string;
}

/**
 * Posición de la imagen en el canvas (en píxeles)
 */
export interface Posicion {
    x: number;
    y: number;
}

/**
 * Dimensiones de la imagen (en píxeles)
 */
export interface Dimensiones {
    ancho: number;
    alto: number;
}

/**
 * Estado de la imagen personalizada
 */
export interface ImagenPersonalizada {
    archivo: File | null;
    urlPreview: string | null;
    posicion: Posicion;
    dimensiones: Dimensiones;
}

/**
 * Límites del área de impresión en la camiseta
 * Valores en porcentaje (0-100) respecto al tamaño de la camiseta
 */
export interface LimitesImpresion {
    superior: number;
    inferior: number;
    izquierdo: number;
    derecho: number;
}

/**
 * Estado completo de la personalización
 */
export interface EstadoPersonalizacion {
    modeloSeleccionado: ModeloCamiseta;
    imagenModeloPersonalizado: string | null;
    imagen: ImagenPersonalizada;
    escala: number; // Factor de escala (0.1 - 2.0)
    zoom: number;   // Nivel de zoom del lienzo (0.5 - 3.0)
    pestañaActiva: 'prenda' | 'diseno' | 'vista'; // Pestaña activa en móvil
}
