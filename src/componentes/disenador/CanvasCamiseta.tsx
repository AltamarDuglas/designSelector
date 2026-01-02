/**
 * CANVAS CAMISETA
 * 
 * Componente principal que muestra la camiseta y permite posicionar/redimensionar la imagen
 */

import { useRef, useState, useEffect } from 'react';
import type { ModeloCamiseta, Posicion } from '../../tipos';
import { MODELOS_DISPONIBLES, LIMITES_AREA_IMPRESION, CONFIG_METRICA } from '../../utilidades/constantes';
import './CanvasCamiseta.css';

interface PropsCanvasCamiseta {
    modelo: ModeloCamiseta;
    imagenUrl: string | null;
    escala: number;
    imagenModeloPersonalizado: string | null;
    zoom: number;
    alCambiarZoom: (nuevoZoom: number) => void;
    alCambiarEscala: (nuevaEscala: number) => void;
    alActualizarPosicion?: (nuevaPosicion: Posicion) => void;
    alTocarDiseno?: () => void;
    alTocarFondo?: () => void;
}

export default function CanvasCamiseta({
    modelo,
    imagenUrl,
    escala,
    imagenModeloPersonalizado,
    zoom,
    alCambiarZoom,
    alCambiarEscala,
    alActualizarPosicion,
    alTocarDiseno,
    alTocarFondo
}: PropsCanvasCamiseta) {
    const contenedorRef = useRef<HTMLDivElement>(null);
    const imagenRef = useRef<HTMLImageElement>(null);

    const [posicion, setPosicion] = useState<Posicion>({ x: 50, y: 40 });
    const [arrastrando, setArrastrando] = useState(false);
    const [modoPellizco, setModoPellizco] = useState<'zoom' | 'escala' | null>(null);
    const [offsetInicial, setOffsetInicial] = useState<Posicion>({ x: 0, y: 0 });
    const [distanciaInicialTouch, setDistanciaInicialTouch] = useState<number | null>(null);

    // Ref para evitar stale closures en event listeners
    const posicionRef = useRef(posicion);
    useEffect(() => { posicionRef.current = posicion; }, [posicion]);

    const infoModelo = MODELOS_DISPONIBLES.find(m => m.id === modelo);
    const rutaImagenModelo = modelo === 'personalizado' ? imagenModeloPersonalizado : infoModelo?.rutaImagen;
    const nombreModelo = modelo === 'personalizado' ? 'Camiseta Personalizada' : infoModelo?.nombre;
    const colorFondoModelo = modelo === 'personalizado' ? '#ffffff' : infoModelo?.colorFondo;

    // Iniciar arrastre o gesto táctil sobre el diseño
    const iniciarInteraccion = (evento: React.MouseEvent | React.TouchEvent) => {
        if (!imagenUrl) return;
        evento.stopPropagation();
        alTocarDiseno?.();

        if ('touches' in evento && evento.touches.length === 2) {
            // Gesto de pellizco en diseño (Escalar Diseño)
            evento.preventDefault();
            const d = Math.hypot(
                evento.touches[0].clientX - evento.touches[1].clientX,
                evento.touches[0].clientY - evento.touches[1].clientY
            );
            setDistanciaInicialTouch(d);
            setModoPellizco('escala');
            setArrastrando(false);
        } else {
            // Arrastre simple
            evento.preventDefault();
            setArrastrando(true);
            setDistanciaInicialTouch(null);
            setModoPellizco(null);

            const punto = 'touches' in evento ? evento.touches[0] : evento;
            const rect = contenedorRef.current?.getBoundingClientRect();

            if (rect) {
                const x = (((punto.clientX - rect.left) / zoom) / (rect.width / zoom)) * 100;
                const y = (((punto.clientY - rect.top) / zoom) / (rect.height / zoom)) * 100;

                setOffsetInicial({
                    x: x - posicion.x,
                    y: y - posicion.y
                });
            }
        }
    };

    // Iniciar gesto en fondo (Zoom Lienzo)
    const iniciarGestosFondo = (evento: React.TouchEvent) => {
        if (evento.touches.length === 2) {
            evento.preventDefault();
            evento.stopPropagation();
            const d = Math.hypot(
                evento.touches[0].clientX - evento.touches[1].clientX,
                evento.touches[0].clientY - evento.touches[1].clientY
            );
            setDistanciaInicialTouch(d);
            setModoPellizco('zoom');
        }
    };

    // Manejar movimiento global
    const manejarMovimiento = (evento: MouseEvent | TouchEvent) => {
        if (!contenedorRef.current) return;

        // Lógica de Pellizco (Zoom o Escala)
        if ('touches' in evento && evento.touches.length === 2 && distanciaInicialTouch !== null && modoPellizco) {
            evento.preventDefault(); // Prevenir zoom del navegador

            const d = Math.hypot(
                evento.touches[0].clientX - evento.touches[1].clientX,
                evento.touches[0].clientY - evento.touches[1].clientY
            );

            const factor = d / distanciaInicialTouch;

            if (modoPellizco === 'zoom') {
                alCambiarZoom(zoom * factor);
            } else if (modoPellizco === 'escala') {
                // Limitar escala min/max (0.1 a 3.0 para dar libertad)
                const nuevaEscala = Math.max(0.1, Math.min(3.0, escala * factor));
                alCambiarEscala(nuevaEscala);
            }

            setDistanciaInicialTouch(d); // Actualizar para cálculo incremental
        }
        // Lógica de Arrastre
        else if (arrastrando) {
            const punto = 'touches' in evento ? evento.touches[0] : evento;
            const rect = contenedorRef.current.getBoundingClientRect();

            let x = (((punto.clientX - rect.left) / zoom) / (rect.width / zoom)) * 100 - offsetInicial.x;
            let y = (((punto.clientY - rect.top) / zoom) / (rect.height / zoom)) * 100 - offsetInicial.y;

            const anchoImagen = 20 * escala;
            const altoImagen = 20 * escala;

            x = Math.max(LIMITES_AREA_IMPRESION.izquierdo,
                Math.min(x, LIMITES_AREA_IMPRESION.derecho - anchoImagen));
            y = Math.max(LIMITES_AREA_IMPRESION.superior,
                Math.min(y, LIMITES_AREA_IMPRESION.inferior - altoImagen));

            setPosicion({ x, y });
        }
    };

    // Finalizar interacción
    const finalizarInteraccion = () => {
        setArrastrando(false);
        setModoPellizco(null);
        setDistanciaInicialTouch(null);
        alActualizarPosicion?.(posicionRef.current);
    };

    // Event listeners globales
    useEffect(() => {
        if (arrastrando || (distanciaInicialTouch !== null && modoPellizco)) {
            window.addEventListener('mousemove', manejarMovimiento);
            window.addEventListener('mouseup', finalizarInteraccion);
            window.addEventListener('touchmove', manejarMovimiento, { passive: false });
            window.addEventListener('touchend', finalizarInteraccion);

            return () => {
                window.removeEventListener('mousemove', manejarMovimiento);
                window.removeEventListener('mouseup', finalizarInteraccion);
                window.removeEventListener('touchmove', manejarMovimiento);
                window.removeEventListener('touchend', finalizarInteraccion);
            };
        }
    }, [arrastrando, offsetInicial, distanciaInicialTouch, zoom, escala, modoPellizco]);

    // Cálculos métricos (basados en 50cm de ancho total)
    const factorConversion = CONFIG_METRICA.anchoLienzoCm / 100;
    const diseñoAnchoCm = (20 * escala * factorConversion).toFixed(1);
    const diseñoAltoCm = (20 * escala * factorConversion).toFixed(1); // Mismo que ancho (aspect ratio 1:1 base)
    const posXCm = (posicion.x * factorConversion).toFixed(1);
    const posYCm = (posicion.y * factorConversion).toFixed(1);

    return (
        <div
            className="canvas-camiseta"
            onClick={(e) => {
                // Solo si el click es directo en el fondo
                if (e.target === e.currentTarget) {
                    alTocarFondo?.();
                }
            }}
            onTouchStart={(e) => {
                // Si toca el fondo (no hijos burbujeando, aunque stopPropagation protege)
                if (e.target === e.currentTarget) {
                    iniciarGestosFondo(e);
                }
            }}
        >
            <div
                className="area-trabajo-zoom"
                style={{
                    width: `${400 * zoom}px`,
                    height: `${(400 * 4 / 3) * zoom}px` // Basado en el aspect-ratio 3/4
                }}
            >
                <div
                    ref={contenedorRef}
                    id="lienzo-exportacion"
                    className={`contenedor-preview ${arrastrando ? 'en-arrastre' : ''}`}
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top left'
                    }}
                >
                    {/* Imagen de la camiseta */}
                    {rutaImagenModelo && (
                        <img
                            src={rutaImagenModelo}
                            alt={nombreModelo}
                            className="imagen-camiseta"
                            draggable={false}
                        />
                    )}

                    {/* Cuadrícula de referencia para impresión */}
                    <div className={`cuadricula ${arrastrando ? 'activo' : ''}`} />

                    {/* Contenedor de diseño con recorte por máscara */}
                    <div
                        className="contenedor-diseno"
                        style={{
                            WebkitMaskImage: rutaImagenModelo ? `url(${rutaImagenModelo})` : 'none',
                            maskImage: rutaImagenModelo ? `url(${rutaImagenModelo})` : 'none'
                        }}
                    >
                        {/* Imagen personalizada */}
                        {imagenUrl && (
                            <>
                                <img
                                    ref={imagenRef}
                                    src={imagenUrl}
                                    alt="Diseño personalizado"
                                    className={`imagen-personalizada ${arrastrando ? 'arrastrando' : ''}`}
                                    style={{
                                        left: `${posicion.x}%`,
                                        top: `${posicion.y}%`,
                                        width: `${20 * escala}%`,
                                        height: `${20 * escala}%`,
                                        cursor: arrastrando ? 'grabbing' : 'grab'
                                    }}
                                    onMouseDown={iniciarInteraccion}
                                    onTouchStart={iniciarInteraccion}
                                    draggable={false}
                                />

                                {/* Indicadores de medida (solo visibles al arrastrar) */}
                                {arrastrando && (
                                    <div
                                        className="indicador-medidas"
                                        style={{
                                            left: `${posicion.x}%`,
                                            top: `${posicion.y - 5}%`
                                        }}
                                    >
                                        <span className="valor-medida">{diseñoAnchoCm} x {diseñoAltoCm} cm</span>
                                        <span className="valor-posicion">Pos: {posXCm}, {posYCm} cm</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {!imagenUrl && (
                <div className="mensaje-vacio">
                    <span className="icono-vacio">👕</span>
                    <p>Sube una imagen para comenzar</p>
                </div>
            )}
        </div>
    );
}
