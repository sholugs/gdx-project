import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(registerUserDto: RegisterUserDto) {
    const candidate = await this.userService.findOneByUsername(
      registerUserDto.username,
    );

    if (candidate) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const user = await this.userService.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    const tokens = this.generateTokens(user.id);

    return tokens;
  }

  async signIn(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOneByUsername(
      loginUserDto.username,
    );

    const tokens = this.generateTokens(user.id);

    return tokens;
  }

  async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.findOneByUsername(userDto.username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && isPasswordEquals) return user;

    throw new UnauthorizedException('Invalid credentials');
  }

  verifyAccessToken(accessToken: string) {
    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: 'secret',
      });
      return decoded;
    } catch (e) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  verifyRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: 'secret',
      });
      return decoded;
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async updateAcessToken(refreshToken: string) {
    try {
      const userId = this.jwtService.verify(refreshToken);

      const tokens = await this.generateTokens(userId);

      return tokens.accessToken;
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(id: string) {
    const payload = { id };

    const accessToken = await this.jwtService.sign(payload, {
      secret: 'secret',
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.sign(payload, {
      secret: 'secret',
      expiresIn: '30d',
    });
    const tokens = { accessToken, refreshToken };

    return tokens;
  }
}
