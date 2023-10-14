import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: string;

  @Column()
  isactive: boolean;
}

export class RegisterDto {
  message: string;
  data: RegisterDataDto
}

export class RegisterDataDto {
  id: string;
  name: string;
  username: string;
  role: string;
  isActive: boolean;
}

