import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create') // admin creates but anyone can register
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all') // admin can use it only
  findAll() {
    return this.usersService.findAll();
  }

  @Get('one') // admin can do it again
  findOne(@Body('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('update') // both admin and user can update info
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post('remove') // admin can easily and user if he sure)
  remove(@Body('id') id: string) {
    return this.usersService.remove(+id);
  }
}
