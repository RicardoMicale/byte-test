import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './datasource/typeorm.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [TypeOrmModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
