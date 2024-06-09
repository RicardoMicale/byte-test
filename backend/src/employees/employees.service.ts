import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmployeeEntity } from './employees.entity';

export interface Employee {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  status: number;
  position: string;
}

@Injectable()
export class EmployeesService {
  private employeeRepository;
  private logger = new Logger();
  //   inject the Datasource provider
  constructor(private dataSource: DataSource) {
    // get employees table repository to interact with the database
    this.employeeRepository = this.dataSource.getRepository(EmployeeEntity);
  }
  //  create handler to create new employee and save to the database
  async createEmployee(createEmployee: Employee): Promise<EmployeeEntity> {
    try {
      const employee = await this.employeeRepository.create(createEmployee);
      return await this.employeeRepository.save(employee);
    } catch (err) {
      if (err.code == 23505) {
        this.logger.error(err.message, err.stack);
        throw new HttpException('email already exists', HttpStatus.CONFLICT);
      }
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }

  async getAllEmployees(): Promise<Employee> {
    try {
      //  gets all employees
      const employees = this.employeeRepository.find({
        select: ['id', 'firstName', 'lastName', 'email', 'status', 'position'],
      });
      return employees;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }

  async getEmployee(id: number): Promise<Employee> {
    try {
      //  gets the employee with the i passed and returns it
      const employee = this.employeeRepository.findOne({
        select: ['id', 'firstName', 'lastName', 'email', 'status', 'position'],
        where: {
          id,
        },
      });
      //  if the employee is not found
      if (!employee) {
        throw new NotFoundException('Employee not found');
      }
      return employee;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }

  async updateEmployee(
    id: number,
    updatedEmployee: Employee,
  ): Promise<Employee> {
    try {
      //  gets the employee with the i passed and returns it
      const employee = this.employeeRepository.findOne({
        select: ['id', 'firstName', 'lastName', 'email', 'status', 'position'],
        where: {
          id,
        },
      });
      //  if the employee is not found
      if (!employee) {
        throw new NotFoundException('Employee not found');
      }
      //  spreads the employee object found and overwrites the object properties being updated
      const _employee = { ...employee, ...updatedEmployee };
      //  updates the employee with the id passed and the data in the updatedEmployee object
      return this.employeeRepository.update(id, _employee);
    } catch (err) {
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }
}
