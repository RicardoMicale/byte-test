import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  position: string;

  @Column({ default: 0 })
  status: number; //  0 => disponible | 1 => vacaciones | 2 => no disponible | 3 => enfermo

  @Column({ unique: true })
  email: string;

  @Column({ default: '1234' })
  password: string;
}
