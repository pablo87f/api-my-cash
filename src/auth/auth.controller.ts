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
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET,
);

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  // @Post('/google/login')
  // async googleLogin(
  //   @Body() body: any, // GoogleTokenDto
  //   @Req() req,
  //   @Ip() ip: string,
  // ): Promise<{ accessToken: string; refreshToken: string }> {
  //   console.log('GoogleTokenDto: ', body);
  //   const result = await this.authService.loginGoogleUser(body.token, {
  //     userAgent: req.headers['user-agent'],
  //     ipAddress: ip,
  //   });
  //   if (result) {
  //     return result;
  //   } else {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.UNAUTHORIZED,
  //         error: 'Error while logging in with google',
  //       },
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  // }

  @Post('/google/login')
  async googleLogin(@Body('token') token: string): Promise<any> {
    console.log('GoogleTokenDto: ', token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID,
    });

    console.log('payload', ticket.getPayload());
    return { name: 'HAHAH', email: 'pablo@teste.com' };
  }
}
