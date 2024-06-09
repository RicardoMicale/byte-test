import React from 'react';
import { getStatusText } from '@/lib/employeeFunctions';
import { Employee } from '@/models';
import { Text } from '@react-pdf/renderer';

interface PDFElementProps {
  employee: Employee;
  index?: number;
}

export default function PDFElement({ employee, index }: PDFElementProps) {
  return (
    <div style={{ marginBottom: '20mm' }}>
      {index && <Text>Empleado #{index}</Text>}
      <section>
        <Text>Nombre: {`${employee.firstName} ${employee.lastName}`}</Text>
      </section>
      <Text>{employee.email}</Text>
      <section>
        <Text>Estatus: {getStatusText(employee.status ?? 0)}</Text>
      </section>
      <section>
        <Text>Posición: {employee.position}</Text>
      </section>
    </div>
  );
}
