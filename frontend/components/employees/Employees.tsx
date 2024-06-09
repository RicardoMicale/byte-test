'use client';

import React from 'react';
import { Employee } from '@/models';
import EmployeeTable from './EmployeeTable';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import PDFButton from '../common/PDFButton';
import { Button } from '../ui/button';
import ExcelExport from '../common/ExcelButton';

export default function Employees() {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const didFetchRef = React.useRef(false);

  React.useEffect(() => {
    if (!didFetchRef.current) {
      //  checks if the fetch was done to prevent multiple calls to backend
      didFetchRef.current = true;
      getEmployees();
    }
  });

  const getEmployees = async () => {
    //  fetch the employees from the database
    const path = 'employees/get';
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
    const json = await res.json();

    //  sets the employees array state
    setEmployees(json);
  };

  return (
    <div className="w-full space-y-4">
      <section className="flex justify-between items-center">
        <Link href="/employees/create">
          <Button className="gap-2">
            <PlusIcon size={16} />
            Registrar empleado
          </Button>
        </Link>
        {/* Download button section */}
        <section className="space-x-2">
          <PDFButton employees={employees} />
          <ExcelExport data={employees} fileName="empleados" />
        </section>
      </section>
      <EmployeeTable employees={employees ?? []} />
    </div>
  );
}
