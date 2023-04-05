import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async create(createUserDto: CreateUserDto): Promise<number> {
    const user: User = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.createdAt = new Date();

    return (await this.repository.save(user)).userId;
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<User> {
    return this.repository.findOne({ where: { userId: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    const user = await this.findOne(id);
    user.email = updateUserDto.email ? updateUserDto.email : user.email;
    user.name = updateUserDto.email ? updateUserDto.name : user.name;
    user.password = updateUserDto.password
      ? updateUserDto.password
      : user.password;

    return (await this.repository.save(user)).userId;
  }

  async remove(id: number): Promise<number> {
    const user = await this.findOne(id);
    return (await this.repository.remove(user)).userId;
  }
}
