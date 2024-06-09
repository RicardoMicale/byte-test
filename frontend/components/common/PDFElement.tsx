import React from 'react';
import { getStatusText } from '@/lib/employeeFunctions';
import { Employee } from '@/models';
import { Text, View } from '@react-pdf/renderer';

interface PDFElementProps {
  employee: Employee;
  index?: number;
}

export default function PDFElement({ employee, index }: PDFElementProps) {
  return (
    <View
      wrap={false}
      style={{ marginBottom: '5mm', marginLeft: '10mm', marginTop: '5mm' }}
    >
      {index && (
        <View
          style={{
            fontSize: '12pt',
            fontWeight: 'bold',
            marginBottom: '2mm',
            textDecoration: 'underline',
          }}
        >
          <Text>Empleado #{index}</Text>
        </View>
      )}
      <View
        style={{
          fontWeight: 'bold',
          fontSize: '12pt',
          marginRight: '2mm',
          marginBottom: '1mm',
        }}
      >
        <Text>Nombre: {`${employee.firstName} ${employee.lastName}`}</Text>
      </View>
      <View style={{ fontSize: '12pt', marginBottom: '1mm' }}>
        <Text>Correo electrónico: {employee.email}</Text>
      </View>
      <View
        style={{
          fontWeight: 'bold',
          fontSize: '12pt',
          marginRight: '2mm',
          marginBottom: '1mm',
        }}
      >
        <Text>Estatus: {getStatusText(employee.status ?? 0)}</Text>
      </View>
      <View
        style={{
          fontWeight: 'bold',
          fontSize: '12pt',
          marginRight: '2mm',
          marginBottom: '1mm',
        }}
      >
        <Text>Posición: {employee.position}</Text>
      </View>
    </View>
  );
}
