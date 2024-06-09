'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import PDFTemplate from './PDFTemplate';
import { Employee } from '@/models';
import { Button } from '../ui/button';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

interface PDFButtonProps {
  employee?: Employee;
  employees?: Employee[];
}

const PDFButton = ({ employee, employees }: PDFButtonProps) => {
  return (
    <Button variant="secondary">
      <PDFDownloadLink
        document={<PDFTemplate employee={employee} employees={employees} />}
        fileName={`${
          employees
            ? 'employees'
            : `${employee?.firstName} ${employee?.lastName}`
        }.pdf`}
      >
        Descargar PDF
      </PDFDownloadLink>
    </Button>
  );
};

export default PDFButton;
