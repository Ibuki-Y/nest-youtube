import { Injectable } from '@nestjs/common'; // NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

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
}
