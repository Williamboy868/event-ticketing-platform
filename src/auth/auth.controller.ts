import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SignUpDto, SignInDto, SocialSignInDto } from './dto/auth.dto.js';

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
  signUp(@Body() _signUpDto: SignUpDto) {
    // Intercepted by better-auth
  }

  @Post('sign-in/email')
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({ status: 200, description: 'User successfully signed in and session created.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  signIn(@Body() _signInDto: SignInDto) {
    // Intercepted by better-auth
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'Sign out the current user' })
  @ApiResponse({ status: 200, description: 'User successfully signed out.' })
  signOut() {
    // Intercepted by better-auth
  }

  @Post('sign-in/social')
  @ApiOperation({ summary: 'Sign in with a social provider (e.g. Google)' })
  @ApiBody({ type: SocialSignInDto })
  @ApiResponse({ status: 200, description: 'Redirects to the provider OAuth consent screen.' })
  signInSocial(@Body() _socialSignInDto: SocialSignInDto) {
    // Intercepted by better-auth
  }
}
