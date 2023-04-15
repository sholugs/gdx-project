import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(id: string) {
    // return await this.userRepository.findOne(id, { relations: ["mycharts"] });
    // por si hay que hacer algo con las relaciones en un futuro;
  }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const newUser = this.userRepository.create(registerUserDto);
    return await this.userRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.save(user);
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({ username });

    return user;
  } //tira error, ver porque.

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
