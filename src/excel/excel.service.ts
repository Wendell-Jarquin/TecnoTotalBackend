import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Reparacion } from '../modules/reparaciones/entities/reparaciones.entity';

@Injectable()
export class ExcelService {
  async generateReparacionesReport(reparaciones: Reparacion[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reparaciones');

    // Agregar título y subtítulo antes de los encabezados
    worksheet.mergeCells('A1:H1');
    worksheet.getCell('A1').value = 'REPORTE DE REPARACIONES';
    worksheet.getCell('A1').font = { size: 16, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.mergeCells('A2:H2');
    worksheet.getCell('A2').value = 'TecnoTotal';
    worksheet.getCell('A2').font = { size: 12, bold: true };
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    // Agregar fecha de creación del reporte en la fila 3
    const fechaReporte = new Date().toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    worksheet.mergeCells('A3:H3');
    worksheet.getCell('A3').value = `Fecha de creación del reporte: ${fechaReporte}`;
    worksheet.getCell('A3').font = { italic: true, size: 11 };
    worksheet.getCell('A3').alignment = { horizontal: 'center' };

    // Los encabezados ahora van en la fila 4
    worksheet.columns = [
      { key: 'id', width: 5 },
      { key: 'nombreCliente', width: 18 },
      { key: 'equipo', width: 14 },
      { key: 'descripcionFalla', width: 22 },
      { key: 'estado', width: 12 },
      { key: 'tecnicoAsignado', width: 20 },
      { key: 'fechaIngreso', width: 16 },
      { key: 'fechaEntrega', width: 16 },
    ];

    // Agregar encabezados manualmente en la fila 4
    worksheet.addRow([
      'ID',
      'Cliente',
      'Equipo',
      'Descripción de Falla',
      'Estado',
      'Técnico Asignado',
      'Fecha de Ingreso',
      'Fecha de Entrega',
    ]);

    // Estilo para encabezados de columna (fila 4)
    worksheet.getRow(4).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF2563EB' }, // Azul profesional
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Agregar datos desde la fila 5
    reparaciones.forEach((reparacion) => {
      worksheet.addRow([
        reparacion.id,
        reparacion.nombreCliente,
        reparacion.equipo,
        reparacion.descripcionFalla,
        reparacion.estado,
        reparacion.tecnicoAsignado || 'No asignado',
        reparacion.fechaIngreso
          ? new Date(reparacion.fechaIngreso).toISOString().split('T')[0]
          : 'Sin fecha',
        reparacion.fechaEntrega
          ? new Date(reparacion.fechaEntrega).toISOString().split('T')[0]
          : 'Pendiente',
      ]);
    });

    // Centrar y dar formato a las filas de datos
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      // Aplica a todas las filas de datos después del encabezado
      if (rowNumber > 4 && rowNumber <= (worksheet.lastRow?.number ?? 0) - 4) {
        row.eachCell((cell) => {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });
      }
    });

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 4) { // Desde la fila de encabezados en adelante
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      }
    });

    // Agregar filas en blanco y firma
    const lastRow = worksheet.lastRow?.number || worksheet.rowCount;
    worksheet.addRow([]);
    worksheet.addRow([]);

    // Línea centrada
    const totalCols = worksheet.columns.length;
    const lineaRowNum = (worksheet.lastRow?.number ?? worksheet.rowCount) + 1;
    worksheet.mergeCells(`A${lineaRowNum}:H${lineaRowNum}`);
    worksheet.getCell(`A${lineaRowNum}`).value = '_________________________';
    worksheet.getCell(`A${lineaRowNum}`).alignment = { horizontal: 'center' };

    // Texto "Autorizado por:" centrado debajo de la línea
    const autorizadoRowNum = lineaRowNum + 1;
    worksheet.mergeCells(`A${autorizadoRowNum}:H${autorizadoRowNum}`);
    worksheet.getCell(`A${autorizadoRowNum}`).value = 'Autorizado por:';
    worksheet.getCell(`A${autorizadoRowNum}`).alignment = { horizontal: 'center' };
    worksheet.getCell(`A${autorizadoRowNum}`).font = { bold: true };

    // Generar el archivo en memoria
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer); // Devuelve un Buffer válido
  }
}
