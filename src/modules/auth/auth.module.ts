import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbService } from 'src/database/db.service';
import { ConfigModule } from '@nestjs/config';
import PrismaUsersRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-users-repository';
import GoogleOAuthService from 'src/@core/domain/infra/services/GoogleOAuthService/GoogleOAuthService';
import LoginByOAuth from 'src/@core/application/use-cases/auth/login-by-o-auth';
import IOAuthService from 'src/@core/domain/services/IOAuthService';
import IUsersRepository from 'src/@core/domain/repositories/IUsersRepository';
import IJwtService from 'src/@core/domain/services/IJwtService';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    DbService,
    JwtStrategy,
    AuthService,
    GoogleOAuthService,
    {
      provide: PrismaUsersRepository,
      useFactory: (db: DbService) => {
        return new PrismaUsersRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: LoginByOAuth,
      useFactory: (
        usersRepository: IUsersRepository,
        oAuthService: IOAuthService,
        jwtService: IJwtService,
      ) => {
        return new LoginByOAuth(usersRepository, oAuthService, jwtService);
      },
      inject: [PrismaUsersRepository, GoogleOAuthService, JwtService],
    },
  ],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
})
export class AuthModule {}
