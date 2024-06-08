import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Employee, EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Post('/create')
  //   handles the post request to /employees/create endpoint to create new user
  async signUp(@Body() employee: Employee) {
    return await this.employeeService.createEmployee(employee);
  }

  @Get('/get')
  //  handles the get request to /employees/get endpoint to get all users
  async getAllUsers() {
    return await this.employeeService.getAllEmployees();
  }

  @Get('/get/:id')
  //  handles the get request to /employees/get/{id} endpoint to get a specific user
  async getUser(@Param('id') id: number) {
    return await this.employeeService.getEmployee(+id);
  }

  @Patch('/update/:id')
  //  handles the get request to /employees/update/{id} endpoint to update a specific user
  async updateUser(@Param('id') id: number, @Body() updatedEmployee) {
    return await this.employeeService.updateEmployee(+id, updatedEmployee);
  }
}
