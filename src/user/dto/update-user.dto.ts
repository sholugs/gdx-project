import { PartialType } from '@nestjs/swagger';

import { RegisterUserDto } from './register-user.dto';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { USER_ROLE } from '../../constants/enum/role';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  @IsEnum(USER_ROLE)
  role: USER_ROLE;
}
