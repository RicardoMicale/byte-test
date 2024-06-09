import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Employee } from '@/models';
import { Button } from '../ui/button';

interface ExcelExportProps {
  data: Employee[];
  fileName: string;
}

const ExcelExport = ({ data, fileName }: ExcelExportProps) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <Button variant="excel" onClick={exportToExcel}>
      Descargar Excel
    </Button>
  );
};

export default ExcelExport;
