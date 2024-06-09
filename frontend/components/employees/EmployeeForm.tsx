import React from 'react';
import { Employee } from '@/models';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { CheckIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import PDFButton from '../common/PDFButton';
import ExcelExport from '../common/ExcelButton';
import { useToast } from '../ui/use-toast';

interface EmployeeFormProps {
  employee: Employee;
  setEmployee: React.Dispatch<React.SetStateAction<Employee>>;
  type: 'create' | 'update';
  title?: string;
}

export default function EmployeeForm({
  employee,
  setEmployee,
  title,
  type,
}: EmployeeFormProps) {
  const { id } = useParams();
  const router = useRouter();
  //  helper state
  const [canClick, setCanClick] = React.useState(true);
  //  toast component activator
  const { toast } = useToast();

  const createEmployee = async () => {
    try {
      //  prevents double clicking
      if (!canClick) return;
      //  sets canClic to false so it wont be called again
      setCanClick(false);
      //  update api path
      const path = 'employees/create';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
        method: 'POST',
        body: JSON.stringify(employee),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //  if the employee was created, redirect to employee table
      if (res.ok) {
        toast({
          title: 'Empleado registrado',
        });
        router.push('/');
      } else {
        toast({
          title: 'Ocurrió un error',
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCanClick(true);
    }
  };

  const updateEmployee = async () => {
    try {
      //  prevents double clicking
      if (!canClick) return;
      //  sets canClic to false so it wont be called again
      setCanClick(false);
      //  update api path
      const path = `employees/update/${id}`;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
        method: 'PATCH',
        body: JSON.stringify(employee),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //  if the employee was updated, redirect to employee table
      if (res.ok) {
        toast({
          title: 'Empleado actualizado',
        });
        router.push('/');
      } else {
        toast({
          title: 'Ocurrió un error',
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCanClick(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <section>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {type === 'update' ? 'Editar' : 'Registrar'} datos del empleado
            </CardDescription>
          </section>
          {type === 'update' && (
            <section className="space-x-2">
              <PDFButton employee={employee} />
              <ExcelExport
                data={[employee]}
                fileName={`${employee.firstName}-${employee.lastName}`}
              />
            </section>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form className="flex items-start justify-start gap-4">
          <section className="md:w-1/2 space-y-2">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={employee?.firstName ?? ''}
                onChange={(e) => {
                  setEmployee({ ...employee, firstName: e.target.value });
                }}
              />
            </div>
            <div>
              <Label htmlFor="position">Posición</Label>
              <Input
                id="position"
                value={employee?.position ?? ''}
                onChange={(e) => {
                  setEmployee({ ...employee, position: e.target.value });
                }}
              />
            </div>
            <div>
              <Label htmlFor="status">Estatus</Label>
              <Select
                name="status"
                onValueChange={(value) => {
                  setEmployee({ ...employee, status: +value });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el estatus del empleado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estatus</SelectLabel>
                    <SelectItem value={'0'}>Disponible</SelectItem>
                    <SelectItem value={'1'}>Vacaciones</SelectItem>
                    <SelectItem value={'2'}>No disponible</SelectItem>
                    <SelectItem value={'3'}>Enfermo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </section>
          <section className="md:w-1/2 space-y-2">
            <div>
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                value={employee?.lastName ?? ''}
                onChange={(e) => {
                  setEmployee({ ...employee, lastName: e.target.value });
                }}
              />
            </div>
            <div>
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                value={employee?.email ?? ''}
                onChange={(e) => {
                  setEmployee({ ...employee, email: e.target.value });
                }}
              />
            </div>
          </section>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        {type === 'update' ? (
          <Button className="gap-2" onClick={updateEmployee}>
            <CheckIcon size={16} />
            Guardar
          </Button>
        ) : (
          <Button className="gap-2" onClick={createEmployee}>
            <CheckIcon size={16} />
            Registrar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
