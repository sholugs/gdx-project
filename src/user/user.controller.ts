import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { USER_ROLE } from 'src/constants/enum/role';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async allUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  public async oneUser() {
    return this.userService.findOne('id');
  }

  @Get('username/:username')
  public async oneUserByUsername() {
    return this.userService.findOneByUsername('username');
  }

  @Post()
  public async createUser(@Body() user: RegisterUserDto) {
    return this.userService.create(user);
  }
  
  @Delete(':id')
  public async deleteUser(@Param('id') id: string) {
    return this.userService.remove('id');
  }

}
