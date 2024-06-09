'use client';

import React from 'react';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { Employee } from '@/models';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';

export default function CreateEmployeePage() {
  const [employee, setEmployee] = React.useState<Employee>({});
  return (
    <div className="w-full space-y-4">
      <Link
        href="/"
        className="flex items-center justify-start gap-2 text-slate-700 hover:text-slate-500"
      >
        <ChevronLeftIcon />
        Volver
      </Link>
      <EmployeeForm
        employee={employee}
        setEmployee={setEmployee}
        title="Registrar empleado"
        type="create"
      />
    </div>
  );
}
