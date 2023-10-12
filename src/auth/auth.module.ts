import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import config from 'src/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
    global: true,
    secret: config.secret,
    signOptions: { expiresIn: 3600 },
  }),
  TypeOrmModule.forFeature([User]),
  PassportModule

]
})
export class AuthModule {}
