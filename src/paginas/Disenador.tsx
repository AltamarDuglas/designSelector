/**
 * PÁGINA - DISEÑADOR DE CAMISETAS
 * 
 * Integra todos los componentes para la personalización de camisetas
 */

import { useState, useEffect } from 'react';
import type { ModeloCamiseta, EstadoPersonalizacion, Posicion } from '../tipos';
import { CONFIG_ESCALA, CONFIG_METRICA } from '../utilidades/constantes';
import SelectorModelo from '../componentes/disenador/SelectorModelo';
import SubidorImagen from '../componentes/disenador/SubidorImagen';
import ControlesTamaño from '../componentes/disenador/ControlesTamaño';
import CanvasCamiseta from '../componentes/disenador/CanvasCamiseta';
import ControlesZoom from '../componentes/disenador/ControlesZoom';
import { generarReporteCamiseta } from '../utilidades/generadorPDF';
import '../App.css';

export default function Disenador() {
    const [estado, setEstado] = useState<EstadoPersonalizacion>({
        modeloSeleccionado: 'blanca',
        imagenModeloPersonalizado: null,
        imagen: {
            archivo: null,
            urlPreview: null,
            posicion: { x: 50, y: 40 },
            dimensiones: { ancho: 100, alto: 100 }
        },
        escala: CONFIG_ESCALA.inicial,
        zoom: 1,
        pestañaActiva: 'prenda'
    });

    const manejarCambioModelo = (nuevoModelo: ModeloCamiseta) => {
        setEstado(prev => ({
            ...prev,
            modeloSeleccionado: nuevoModelo
        }));
    };

    const manejarSubidaModelo = (archivo: File) => {
        const urlPreview = URL.createObjectURL(archivo);
        setEstado(prev => ({
            ...prev,
            modeloSeleccionado: 'personalizado',
            imagenModeloPersonalizado: urlPreview
        }));
    };

    const manejarSubidaImagen = (archivo: File) => {
        const urlPreview = URL.createObjectURL(archivo);

        setEstado(prev => ({
            ...prev,
            imagen: {
                ...prev.imagen,
                archivo,
                urlPreview
            }
        }));
    };

    const manejarCambioEscala = (nuevaEscala: number) => {
        setEstado(prev => ({
            ...prev,
            escala: nuevaEscala
        }));
    };

    const manejarActualizarPosicion = (nuevaPosicion: Posicion) => {
        setEstado(prev => ({
            ...prev,
            imagen: {
                ...prev.imagen,
                posicion: nuevaPosicion
            }
        }));
    };

    const manejarCambioZoom = (nuevoZoom: number) => {
        const zoomLimitado = Math.max(0.5, Math.min(3, nuevoZoom));
        setEstado(prev => ({
            ...prev,
            zoom: zoomLimitado
        }));
    };

    const manejarExportacion = () => {
        if (!estado.imagen.urlPreview) {
            alert("Primero debes subir un diseño.");
            return;
        }

        const factorConversion = CONFIG_METRICA.anchoLienzoCm / 100;
        const anchoCm = (20 * estado.escala * factorConversion).toFixed(1);
        const altoCm = (20 * estado.escala * factorConversion).toFixed(1);
        const posXCm = (estado.imagen.posicion.x * factorConversion).toFixed(1);
        const posYCm = (estado.imagen.posicion.y * factorConversion).toFixed(1);

        generarReporteCamiseta({
            modelo: estado.modeloSeleccionado,
            dimensiones: { ancho: anchoCm, alto: altoCm },
            posicion: { x: posXCm, y: posYCm }
        });
    };

    useEffect(() => {
        const manejarEventosTeclado = (e: KeyboardEvent) => {
            if (!e.ctrlKey) return;

            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                manejarCambioZoom(estado.zoom + 0.1);
            } else if (e.key === '-') {
                e.preventDefault();
                manejarCambioZoom(estado.zoom - 0.1);
            } else if (e.key === '0') {
                e.preventDefault();
                manejarCambioZoom(1.0);
            }
        };

        const manejarEventoWheel = (e: WheelEvent) => {
            if (!e.ctrlKey) return;

            const target = e.target as HTMLElement;
            const canvas = document.querySelector('.contenido-principal');

            if (canvas && canvas.contains(target)) {
                e.preventDefault();
                const factor = e.deltaY > 0 ? -0.1 : 0.1;
                manejarCambioZoom(estado.zoom + factor);
            }
        };

        window.addEventListener('keydown', manejarEventosTeclado);
        window.addEventListener('wheel', manejarEventoWheel, { passive: false });

        return () => {
            window.removeEventListener('keydown', manejarEventosTeclado);
            window.removeEventListener('wheel', manejarEventoWheel);
        };
    }, [estado.zoom]);

    const [controlesVisibles, setControlesVisibles] = useState(true);

    return (
        <div className="app-sublimacion">
            <main className="contenido-principal">
                <CanvasCamiseta
                    modelo={estado.modeloSeleccionado}
                    imagenUrl={estado.imagen.urlPreview}
                    escala={estado.escala}
                    imagenModeloPersonalizado={estado.imagenModeloPersonalizado}
                    zoom={estado.zoom}
                    alCambiarZoom={manejarCambioZoom}
                    alCambiarEscala={manejarCambioEscala}
                    alActualizarPosicion={manejarActualizarPosicion}
                    alTocarDiseno={() => setControlesVisibles(false)}
                    alTocarFondo={() => setControlesVisibles(true)}
                />
            </main>

            <aside className={`panel-controles ${!controlesVisibles ? 'oculto' : ''}`}>
                <div className="tabs-movil">
                    <button
                        className={`tab-btn ${estado.pestañaActiva === 'prenda' ? 'activo' : ''}`}
                        onClick={() => setEstado(prev => ({ ...prev, pestañaActiva: 'prenda' }))}
                    >
                        👕 Prenda
                    </button>
                    <button
                        className={`tab-btn ${estado.pestañaActiva === 'diseno' ? 'activo' : ''}`}
                        onClick={() => setEstado(prev => ({ ...prev, pestañaActiva: 'diseno' }))}
                    >
                        🎨 Diseño
                    </button>
                    <button
                        className={`tab-btn ${estado.pestañaActiva === 'vista' ? 'activo' : ''}`}
                        onClick={() => setEstado(prev => ({ ...prev, pestañaActiva: 'vista' }))}
                    >
                        🔍 Vista
                    </button>
                </div>

                <div className="contenido-scroll-panel">
                    <div className={`seccion-panel ${estado.pestañaActiva === 'prenda' ? 'activa' : ''}`}>
                        <SelectorModelo
                            modeloSeleccionado={estado.modeloSeleccionado}
                            alCambiarModelo={manejarCambioModelo}
                        />

                        <div className="grupo-subida">
                            <div className="subida-item">
                                <h4 className="titulo-control">Tu Camiseta (PNG)</h4>
                                <SubidorImagen
                                    alSubirImagen={manejarSubidaModelo}
                                    imagenActual={estado.imagenModeloPersonalizado}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`seccion-panel ${estado.pestañaActiva === 'diseno' ? 'activa' : ''}`}>
                        <div className="grupo-subida">
                            <div className="subida-item">
                                <h4 className="titulo-control">Tu Diseño</h4>
                                <SubidorImagen
                                    alSubirImagen={manejarSubidaImagen}
                                    imagenActual={estado.imagen.urlPreview}
                                />
                            </div>
                        </div>

                        <ControlesTamaño
                            escala={estado.escala}
                            alCambiarEscala={manejarCambioEscala}
                            deshabilitado={!estado.imagen.urlPreview}
                        />
                    </div>

                    <div className={`seccion-panel ${estado.pestañaActiva === 'vista' ? 'activa' : ''}`}>
                        <ControlesZoom
                            zoom={estado.zoom}
                            alCambiarZoom={manejarCambioZoom}
                        />
                        <button
                            className="boton-primario"
                            onClick={manejarExportacion}
                            disabled={!estado.imagen.urlPreview}
                            style={{ marginTop: '1rem', width: '100%' }}
                        >
                            📑 Exportar PDF
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
