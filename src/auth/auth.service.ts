import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(id: string, { username, password }: CreateUserDto) {
    const user = await this.usersService.findOne(id);

    if (username !== user.username || password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return true;
  }

  async login(id: string, createUserDto: CreateUserDto) {
    if (await this.validateUser(id, createUserDto)) {
      const payload = { username: createUserDto.username };

      return { access_token: this.jwtService.sign(payload) };
    }
  }
}
