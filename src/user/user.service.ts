import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ id })
      .getOne();
    // por si hay que hacer algo con las relaciones en un futuro;
  }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const newUser = this.userRepository.create(registerUserDto);
    return await this.userRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: UpdateResult = await this.userRepository.update(
      id,
      updateUserDto,
    );

    if (user.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return this.findOne(id);
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ username })
      .getOne();

    return user;
  }

  async remove(id: string): Promise<User> {
    const user: UpdateResult = await this.userRepository.update(id, {
      isActive: false,
    });

    if (user.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return this.findOne(id);
  }
}
