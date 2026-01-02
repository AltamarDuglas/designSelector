/**
 * SELECTOR DE MODELO
 * 
 * Componente para seleccionar el modelo de camiseta (blanca o negra)
 */

import type { ModeloCamiseta } from '../../tipos';
import { MODELOS_DISPONIBLES } from '../../utilidades/constantes';
import './SelectorModelo.css';

interface PropsSelectorModelo {
    modeloSeleccionado: ModeloCamiseta;
    alCambiarModelo: (modelo: ModeloCamiseta) => void;
}

export default function SelectorModelo({
    modeloSeleccionado,
    alCambiarModelo
}: PropsSelectorModelo) {
    return (
        <div className="selector-modelo">
            <h3 className="titulo-selector">Selecciona tu camiseta</h3>
            <div className="grid-modelos">
                {MODELOS_DISPONIBLES.map((modelo) => (
                    <button
                        key={modelo.id}
                        className={`tarjeta-modelo glass ${modeloSeleccionado === modelo.id ? 'activo' : ''
                            }`}
                        onClick={() => alCambiarModelo(modelo.id)}
                        aria-label={`Seleccionar ${modelo.nombre}`}
                    >
                        <div
                            className="preview-modelo"
                            style={{ backgroundColor: modelo.colorFondo }}
                        >
                            <img
                                src={modelo.rutaImagen}
                                alt={modelo.nombre}
                                className="imagen-modelo"
                            />
                        </div>
                        <span className="nombre-modelo">{modelo.nombre}</span>
                    </button>
                ))}

                <button
                    className={`tarjeta-modelo glass ${modeloSeleccionado === 'personalizado' ? 'activo' : ''}`}
                    onClick={() => alCambiarModelo('personalizado')}
                    aria-label="Seleccionar modelo personalizado"
                >
                    <div className="preview-modelo" style={{ backgroundColor: '#ffffff' }}>
                        <span style={{ fontSize: '2rem' }}>🖼️</span>
                    </div>
                    <span className="nombre-modelo">Personalizada</span>
                </button>
            </div>
        </div>
    );
}
