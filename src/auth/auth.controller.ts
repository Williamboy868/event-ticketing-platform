import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignUpDto, SignInDto } from './dto/auth.dto.js';

/**
 * Note: These endpoints are purely for Swagger documentation purposes.
 * The actual route handling is intercepted and managed by better-auth's 
 * middleware in main.ts.
 */
@ApiTags('Authentication (Better Auth)')
@Controller('api/auth')
export class AuthController {
  
  @Post('sign-up/email')
  @ApiOperation({ summary: 'Sign up with email and password' })
  @ApiResponse({ status: 200, description: 'User successfully signed up and session created.' })
  signUp(@Body() signUpDto: SignUpDto) {
    // Intercepted by better-auth
  }

  @Post('sign-in/email')
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({ status: 200, description: 'User successfully signed in and session created.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  signIn(@Body() signInDto: SignInDto) {
    // Intercepted by better-auth
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'Sign out the current user' })
  @ApiResponse({ status: 200, description: 'User successfully signed out.' })
  signOut() {
    // Intercepted by better-auth
  }
}
