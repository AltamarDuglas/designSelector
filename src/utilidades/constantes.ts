/**
 * CONSTANTES - SUBLIMACIÓN
 * 
 * Valores constantes usados en toda la aplicación
 */

import type { InfoModelo, LimitesImpresion } from '../tipos';

/**
 * Modelos de camisetas disponibles
 */
export const MODELOS_DISPONIBLES: InfoModelo[] = [
    {
        id: 'blanca',
        nombre: 'Camiseta Blanca',
        rutaImagen: '/camisetas/blanca.png',
        colorFondo: '#f8fafc'
    },
    {
        id: 'negra',
        nombre: 'Camiseta Negra',
        rutaImagen: '/camisetas/negra.png',
        colorFondo: '#1e293b'
    }
];

/**
 * Límites del área de impresión
 * Valores en porcentaje respecto al tamaño de la camiseta
 */
export const LIMITES_AREA_IMPRESION: LimitesImpresion = {
    superior: 0,
    inferior: 100,
    izquierdo: 0,
    derecho: 100
};

/**
 * Configuración de escala de imagen
 */
export const CONFIG_ESCALA = {
    minima: 0.1,
    maxima: 2.0,
    inicial: 0.5,
    paso: 0.05
};

/**
 * Tipos de archivo permitidos
 */
export const TIPOS_ARCHIVO_PERMITIDOS = ['image/png'];

/**
 * Tamaño máximo de archivo (5MB)
 */
export const TAMAÑO_MAXIMO_ARCHIVO = 5 * 1024 * 1024;

/**
 * Escala métrica para impresión
 * El área total del canvas representa 50cm de ancho
 */
export const CONFIG_METRICA = {
    anchoLienzoCm: 50,
    pasoCuadriculaCm: 1,
    lineaGrandeCada: 5 // Línea más fuerte cada 5cm
};
