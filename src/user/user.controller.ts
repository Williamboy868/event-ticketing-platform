import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service.js';

interface User {
  name :string;
  age :number;
  email :string;
}

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}
 
    @Get('findAll')
  findAll():User[] {
   return this.userService.findAll();
  }

  @Get('findOne')
findOne(@Query('query') query :[]) {
  return ` ${query} is found`;
}

 @Post()
  create(@Body() user: User):User {
  return this.userService.create(user);
}

}
