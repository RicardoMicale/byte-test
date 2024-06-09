import React from 'react';
import { Employee } from '@/models';
import PDFElement from './PDFElement';
import { Document, Page, View, Text } from '@react-pdf/renderer';

interface PDFTemplateProps {
  employee?: Employee;
  employees?: Employee[];
}

export default function PDFTemplate({ employee, employees }: PDFTemplateProps) {
  if (employee) {
    return (
      <Document>
        <Page size="A4" wrap>
          <View
            style={{
              fontWeight: 'bold',
              fontSize: '12pt',
              marginRight: '2mm',
              marginBottom: '3mm',
              marginLeft: '10mm',
              marginTop: '5mm',
            }}
          >
            <Text>Resumen de empleado</Text>
          </View>
          <PDFElement employee={employee} />
        </Page>
      </Document>
    );
  }
  return (
    <Document>
      <Page size="A4" wrap>
        <View
          style={{
            fontWeight: 'bold',
            fontSize: '12pt',
            marginRight: '2mm',
            marginBottom: '3mm',
            marginLeft: '10mm',
            marginTop: '5mm',
          }}
        >
          <Text>Número de empleados: {employees?.length}</Text>
        </View>

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
