/**
 * CONTROLES DE ZOOM
 * 
 * Componente para ajustar el nivel de zoom del lienzo de trabajo
 */

import './ControlesZoom.css';

interface PropsControlesZoom {
    zoom: number;
    alCambiarZoom: (nuevoZoom: number) => void;
}

export default function ControlesZoom({
    zoom,
    alCambiarZoom
}: PropsControlesZoom) {
    const minZoom = 0.5;
    const maxZoom = 3.0;
    const paso = 0.1;

    const incrementar = () => {
        if (zoom < maxZoom) {
            alCambiarZoom(Math.min(maxZoom, zoom + paso));
        }
    };

    const decrementar = () => {
        if (zoom > minZoom) {
            alCambiarZoom(Math.max(minZoom, zoom - paso));
        }
    };

    const resetear = () => {
        alCambiarZoom(1.0);
    };

    return (
        <div className="controles-zoom glass">
            <div className="info-zoom">
                <span className="etiqueta-zoom">Zoom</span>
                <span className="valor-zoom">{Math.round(zoom * 100)}%</span>
            </div>

            <div className="botones-zoom">
                <button
                    className="boton-zoom"
                    onClick={decrementar}
                    disabled={zoom <= minZoom}
                    title="Alejar"
                >
                    −
                </button>

                <input
                    type="range"
                    min={minZoom}
                    max={maxZoom}
                    step={paso}
                    value={zoom}
                    onChange={(e) => alCambiarZoom(parseFloat(e.target.value))}
                    className="slider-zoom"
                />

                <button
                    className="boton-zoom"
                    onClick={incrementar}
                    disabled={zoom >= maxZoom}
                    title="Acercar"
                >
                    +
                </button>
            </div>

            <button className="boton-reset-zoom" onClick={resetear}>
                Resetear Vista
            </button>
        </div>
    );
}
