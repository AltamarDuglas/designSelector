/**
 * CONTROLES DE TAMAÑO
 * 
 * Componente para ajustar el tamaño de la imagen
 */

import { CONFIG_ESCALA } from '../../utilidades/constantes';
import './ControlesTamaño.css';

interface PropsControlesTamaño {
    escala: number;
    alCambiarEscala: (nuevaEscala: number) => void;
    deshabilitado?: boolean;
}

export default function ControlesTamaño({
    escala,
    alCambiarEscala,
    deshabilitado = false
}: PropsControlesTamaño) {

    const aumentarEscala = () => {
        const nuevaEscala = Math.min(
            escala + CONFIG_ESCALA.paso,
            CONFIG_ESCALA.maxima
        );
        alCambiarEscala(nuevaEscala);
    };

    const disminuirEscala = () => {
        const nuevaEscala = Math.max(
            escala - CONFIG_ESCALA.paso,
            CONFIG_ESCALA.minima
        );
        alCambiarEscala(nuevaEscala);
    };

    const manejarCambioSlider = (evento: React.ChangeEvent<HTMLInputElement>) => {
        alCambiarEscala(parseFloat(evento.target.value));
    };

    const porcentaje = Math.round(escala * 100);

    return (
        <div className="controles-tamaño glass">
            <div className="encabezado-controles">
                <span className="etiqueta-control">Tamaño</span>
                <span className="valor-control">{porcentaje}%</span>
            </div>

            <div className="grupo-controles">
                <button
                    className="boton-control"
                    onClick={disminuirEscala}
                    disabled={deshabilitado || escala <= CONFIG_ESCALA.minima}
                    aria-label="Disminuir tamaño"
                >
                    −
                </button>

                <input
                    type="range"
                    min={CONFIG_ESCALA.minima}
                    max={CONFIG_ESCALA.maxima}
                    step={CONFIG_ESCALA.paso}
                    value={escala}
                    onChange={manejarCambioSlider}
                    disabled={deshabilitado}
                    className="slider-tamaño"
                    aria-label="Ajustar tamaño"
                />

                <button
                    className="boton-control"
                    onClick={aumentarEscala}
                    disabled={deshabilitado || escala >= CONFIG_ESCALA.maxima}
                    aria-label="Aumentar tamaño"
                >
                    +
                </button>
            </div>
        </div>
    );
}
