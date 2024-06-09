'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Employee } from '@/models';
import EmployeeForm from '@/components/employees/EmployeeForm';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';

export default function EmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = React.useState<Employee>({});
  const didFetchRef = React.useRef(false);

  React.useEffect(() => {
    if (!didFetchRef.current) {
      didFetchRef.current = true;
      getEmployee();
    }
  });

  const getEmployee = async () => {
    if (!id) {
      return;
    }
    //  fetches employee from the backend
    const path = 'employees/get';
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}/${id}`);
    const json = await res.json();
    setEmployee(json);
  };
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
        title={`${employee.firstName} ${employee.lastName}`}
        type="update"
      />
    </div>
  );
}
