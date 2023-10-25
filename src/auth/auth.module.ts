import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import config from 'src/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
    global: true,
    secret: config.secret,
    signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRED_TIME },
  }),
  TypeOrmModule.forFeature([User]),
  PassportModule

]
})
export class AuthModule {}
