'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@/models';
import { Badge } from '../ui/badge';
import { getStatusText } from '@/lib/employeeFunctions';
import { EditIcon } from 'lucide-react';
import { DataTable } from '../ui/data-table';
import Link from 'next/link';

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'index',
    header: 'ID',
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: 'firstName',
    header: 'Nombre',
  },
  {
    accessorKey: 'lastName',
    header: 'Apellido',
  },
  {
    accessorKey: 'position',
    header: 'Posición',
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status');
      let variant:
        | 'available'
        | 'vacation'
        | 'unavailable'
        | 'sick'
        | null
        | undefined;
      switch (status) {
        case 1:
          variant = 'vacation';
          break;
        case 2:
          variant = 'unavailable';
          break;
        case 3:
          variant = 'sick';
          break;
        default:
          break;
      }
      return (
        <Badge variant={variant}>{getStatusText(row.getValue('status'))}</Badge>
      );
    },
  },
  {
    accessorKey: 'id',
    header: 'Editar',
    cell: ({ row }) => {
      return (
        <Link href={`/employees/${row.getValue('id')}`}>
          <EditIcon size={20} />
        </Link>
      );
    },
  },
];

interface EmployeeTableProps {
  employees: Employee[];
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <div>
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
