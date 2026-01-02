
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DatosReporte {
    modelo: string;
    dimensiones: { ancho: string; alto: string };
    posicion: { x: string; y: string };
}

export const generarReporteCamiseta = async (datos: DatosReporte) => {
    const elemento = document.getElementById('lienzo-exportacion');
    if (!elemento) {
        console.error('No se encontró el elemento lienzo-exportacion');
        return;
    }

    try {
        // Guardar el transform original
        const transformOriginal = elemento.style.transform;

        // Resetear el zoom temporalmente para captura limpia
        elemento.style.transform = 'scale(1)';

        // Forzar cuadrícula visible temporalmente
        const cuadricula = elemento.querySelector('.cuadricula') as HTMLElement;
        let opacidadOriginal = '';
        let displayOriginal = '';

        if (cuadricula) {
            opacidadOriginal = cuadricula.style.opacity;
            displayOriginal = cuadricula.style.display;

            cuadricula.style.opacity = '1';
            cuadricula.style.display = 'block';
            cuadricula.classList.add('activo');
        }

        // Esperar a que se apliquen los cambios
        await new Promise(r => setTimeout(r, 100));

        // Capturar
        const canvas = await html2canvas(elemento, {
            scale: 3,
            useCORS: true,
            backgroundColor: null,
            logging: false
        });

        // Restaurar estados originales
        elemento.style.transform = transformOriginal;
        if (cuadricula) {
            cuadricula.style.opacity = opacidadOriginal;
            cuadricula.style.display = displayOriginal;
            cuadricula.classList.remove('activo');
        }

        const imgData = canvas.toDataURL('image/png');

        // Crear PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const anchoPagina = pdf.internal.pageSize.getWidth();
        const altoPagina = pdf.internal.pageSize.getHeight();
        const margen = 20;

        // Encabezado
        pdf.setFontSize(22);
        pdf.setTextColor(30, 41, 59);
        pdf.text('Reporte de Diseño - Sublimación', margen, 30);

        pdf.setFontSize(11);
        pdf.setTextColor(100, 116, 139);
        pdf.text(`Fecha: ${new Date().toLocaleDateString()}`, margen, 38);

        // Imagen - Usar el ratio real del canvas capturado
        const anchoImagenPDF = 120;
        const ratioCanvas = canvas.height / canvas.width;
        const altoImagenPDF = anchoImagenPDF * ratioCanvas;

        const xImagen = (anchoPagina - anchoImagenPDF) / 2;
        const yImagen = 50;

        pdf.addImage(imgData, 'PNG', xImagen, yImagen, anchoImagenPDF, altoImagenPDF);

        // Datos Técnicos
        const yDatosStart = yImagen + altoImagenPDF + 15;

        pdf.setFillColor(248, 250, 252);
        pdf.rect(margen, yDatosStart, anchoPagina - (margen * 2), 50, 'F');

        pdf.setFontSize(15);
        pdf.setTextColor(30, 41, 59);
        pdf.text('Especificaciones Técnicas', margen + 5, yDatosStart + 10);

        pdf.setDrawColor(203, 213, 225);
        pdf.line(margen + 5, yDatosStart + 14, anchoPagina - margen - 5, yDatosStart + 14);

        const columnsY = yDatosStart + 24;
        const lineHeight = 10;

        const agregarDato = (etiqueta: string, valor: string, yPosVar: number) => {
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(71, 85, 105);
            pdf.text(etiqueta, margen + 10, yPosVar);

            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(15, 23, 42);
            pdf.text(valor, margen + 70, yPosVar);
        };

        agregarDato('Modelo Base:', datos.modelo.charAt(0).toUpperCase() + datos.modelo.slice(1), columnsY);
        agregarDato('Dimensiones:', `${datos.dimensiones.ancho} x ${datos.dimensiones.alto} cm`, columnsY + lineHeight);
        agregarDato('Posición (X, Y):', `${datos.posicion.x}, ${datos.posicion.y} cm`, columnsY + (lineHeight * 2));

        // Nota sobre cuadrícula
        pdf.setFontSize(9);
        pdf.setTextColor(100, 116, 139);
        pdf.text('* La cuadrícula muestra líneas cada 1cm (finas) y cada 5cm (gruesas)', margen + 10, columnsY + (lineHeight * 3) + 5);

        // Pie de página
        pdf.setFontSize(10);
        pdf.setTextColor(148, 163, 184);
        pdf.text('Generado por Sublimación', anchoPagina / 2, altoPagina - 15, { align: 'center' });

        // Guardar
        pdf.save(`disenoSublimacion_${Date.now()}.pdf`);

    } catch (error) {
        console.error('Error al generar PDF:', error);
        alert('Hubo un error al generar el reporte PDF.');
    }
};
