import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  name!: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email!: string;

  @ApiProperty({ example: 'password123', description: 'User password (min 8 chars)' })
  password!: string;
}

export class SignInDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email!: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password!: string;
}

export class SocialSignInDto {
  @ApiProperty({
    example: 'google',
    description: 'Social provider ID',
    enum: ['google'],
  })
  provider!: string;

  @ApiProperty({
    example: '/dashboard',
    description: 'URL to redirect to after successful authentication',
    required: false,
  })
  callbackURL?: string;
}
