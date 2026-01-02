/**
 * SUBIDOR DE IMAGEN
 * 
 * Componente para subir imágenes PNG
 */

import { useRef } from 'react';
import { TIPOS_ARCHIVO_PERMITIDOS, TAMAÑO_MAXIMO_ARCHIVO } from '../../utilidades/constantes';
import './SubidorImagen.css';

interface PropsSubidorImagen {
    alSubirImagen: (archivo: File) => void;
    imagenActual: string | null;
}

export default function SubidorImagen({
    alSubirImagen,
    imagenActual
}: PropsSubidorImagen) {
    const inputRef = useRef<HTMLInputElement>(null);

    const manejarCambioArchivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = evento.target.files?.[0];

        if (!archivo) return;

        // Validar tipo de archivo
        if (!TIPOS_ARCHIVO_PERMITIDOS.includes(archivo.type)) {
            alert('⚠️ Solo se permiten archivos PNG');
            return;
        }

        // Validar tamaño
        if (archivo.size > TAMAÑO_MAXIMO_ARCHIVO) {
            alert('⚠️ El archivo es demasiado grande. Máximo 5MB');
            return;
        }

        alSubirImagen(archivo);
    };

    const abrirSelector = () => {
        inputRef.current?.click();
    };

    return (
        <div className="subidor-imagen">
            <input
                ref={inputRef}
                type="file"
                accept=".png,image/png"
                onChange={manejarCambioArchivo}
                style={{ display: 'none' }}
                aria-label="Subir imagen PNG"
            />

            {imagenActual ? (
                <div className="preview-imagen glass" onClick={abrirSelector}>
                    <img src={imagenActual} alt="Preview" className="imagen-preview" />
                    <div className="overlay-cambiar">
                        <span>📷 Cambiar imagen</span>
                    </div>
                </div>
            ) : (
                <button
                    className="boton-subir glass primario"
                    onClick={abrirSelector}
                >
                    <span className="icono-subir">📤</span>
                    <span>Subir imagen PNG</span>
                </button>
            )}

            <p className="texto-ayuda">
                Solo archivos PNG • Máximo 5MB
            </p>
        </div>
    );
}
