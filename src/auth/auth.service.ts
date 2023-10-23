import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import config from 'src/config';


// export type User = any;
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

  async refreshToken(token:string){
    try{

    
    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: config.refreshSecret
      }
    );
    const user = await this.userRepository.findOneBy({id:payload['id']});
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return {
      accessToken: await this.jwtService.signAsync(
        {
          id:user.id,
          nama:user.nama,
          username:user.username,
          role:user.role.split(','),
          isActive:user.isactive
        }),
      refreshToken: token
  };
  }
  catch(err){
    throw err
  }
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOneBy({username:username});
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return {
        accessToken: await this.jwtService.signAsync(
          {
            id:user.id,
            nama:user.nama,
            username:user.username,
            role:user.role.split(','),
            isActive:user.isactive
          }),
        refreshToken: await this.jwtService.signAsync(
          {
            id:user.id
          },
          {
            secret: config.refreshSecret,
            expiresIn: '1d'
          }
          )
    };
  }

  async create(user: User): Promise<User> {
    try{
      const salt = await bcrypt.genSalt();
      const password = user.password;
      const hash = await bcrypt.hash(password, salt);
      user.password=hash
      user.salt=salt

      return this.userRepository.save(user);
    } catch(error){
      throw error
    }
  
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

//   async register(username: string, password: string): Promise<{ token: string }> {
//     const user = await this.create({ username, password });
//     const token = this.jwtService.sign({ username });
//     return { token };
//   }
}