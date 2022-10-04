import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServise: UsersService) {}

  @Get()
  findAll() {
    return this.usersServise.findAll();
  }

  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersServise.create(createUser);
  }
}
