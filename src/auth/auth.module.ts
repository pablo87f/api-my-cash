import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbService } from 'src/database/db.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DbService],
  imports: [ConfigModule.forRoot()],
})
export class AuthModule {}
