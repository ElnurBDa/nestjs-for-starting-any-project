import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all') // i will put Guard so only admin can view that
  findAll() {
    return this.usersService.findAll();
  }

  @Get('one')
  findOne(@Body('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('update')
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post('remove')
  remove(@Body('id') id: string) {
    return this.usersService.remove(+id);
  }
}
