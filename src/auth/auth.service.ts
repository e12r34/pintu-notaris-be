import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


// export type User = any;
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOneBy({username:username});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();

      // return {
      //   message: 'Invalid username or password'
      // }
    }

    return {
        access_token: await this.jwtService.signAsync(
          {
            nama:user.nama,
            username:username,
            role:user.role,
            isActive:user.isactive
          }),
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