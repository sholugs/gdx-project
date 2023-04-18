import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { USER_ROLE } from '../../constants/enum/role';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: USER_ROLE, default: USER_ROLE.BASIC })
  role: USER_ROLE;
}
