import React from 'react';
import { Employee } from '@/models';
import PDFElement from './PDFElement';
import { Document, Page } from '@react-pdf/renderer';

interface PDFTemplateProps {
  employee?: Employee;
  employees?: Employee[];
}

export default function PDFTemplate({ employee, employees }: PDFTemplateProps) {
  if (employee) {
    return (
      <Document>
        <Page size="A4" wrap>
          <PDFElement employee={employee} />
        </Page>
      </Document>
    );
  }
  return (
    <Document>
      <Page size="A4" wrap>
        {employees?.map((_employee, index) => (
          <PDFElement
            employee={_employee}
            index={index + 1}
            key={_employee?.email ?? index}
          />
        ))}
      </Page>
    </Document>
  );
}
