import { Injectable } from '@nestjs/common';

interface User {
  name :string;
  age :number;
  email :string;
}

@Injectable()
export class UserService {
 private readonly users:User[]= [];

  create(user:User) {
    this.users.push(user);
    return user
  }

  findAll():User[] {
    return this.users;
  }
}
