import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Ip,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import SignInByOAuth from 'src/@core/application/use-cases/auth/sign-in-by-o-auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly signUpByOAuth: SignInByOAuth,
  ) {}

  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    return this.authService.login(
      body.email,
      // body.password,
      {
        ipAddress: ip,
        userAgent: request.headers['user-agent'],
      },
    );
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }

  @Post('/google/login')
  async googleLogin(@Body('token') token: string): Promise<any> {
    const authInfo = await this.signUpByOAuth.execute({
      token,
    });
    if (!authInfo) {
      if (!authInfo) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    }
    return authInfo.props;
  }
}
