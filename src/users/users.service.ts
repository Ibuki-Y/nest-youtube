import { Injectable } from '@nestjs/common'; // NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
// import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  users: CreateUserDto[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id: Number(id) } });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: Number(id) },
    });
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;

    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
