import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

class SignInDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Headers('authorization') authorization: string) {
    const token = this.extractTokenFromHeader(authorization);
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    return this.authService.signOut(token);
  }

  @Get('me')
  async getMe(@Headers('authorization') authorization: string) {
    const token = this.extractTokenFromHeader(authorization);
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    return this.authService.getMe(token);
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    if (!authorization) {
      return undefined;
    }
    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
