import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/:id')
  login(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    return this.authService.login(id, createUserDto);
  }
}
