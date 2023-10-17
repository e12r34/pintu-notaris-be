import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDataDto, RegisterResponseDto, LoginDto, LoginResultDto, refreshDto, RegisterRequestDto } from './auth.dto';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    
  @Post('register')
  async register(@Body() userData: RegisterRequestDto): Promise<RegisterResponseDto> {
    try{
        const user = new User();
        user.nama = userData.nama;
        user.username = userData.username;
        user.password = userData.password; // Hash the password before saving
        user.role = userData.role.join(',');
        user.isactive = true;
        const createdUser = await this.authService.create(user)
        const userDataResponse: RegisterDataDto = {
            id: createdUser.id,
            name: createdUser.nama,
            username: createdUser.username,
            role: createdUser.role.split(','),
            isActive: createdUser.isactive,
        };
        return {
            message: "Register Success",
            data: userDataResponse,
        }
        
    } catch (error){
          throw error;
    }
    
  }

    @Post('login')
    async login(@Body() loginDto: LoginDto ) : Promise<LoginResultDto> {
        const username=loginDto.username
        const password=loginDto.password
        if (!username||!password) {
            throw new BadRequestException()
        }
        const token= await this.authService.login(username, password);
        
        return {
            message:"Login Success",
            ...token
        }
    }

    @Post('refresh-token')
    async refreshToken(@Body() refreshDto: refreshDto ) : Promise<LoginResultDto> {
        if (!refreshDto.refreshToken) {
            throw new BadRequestException("No refresh token provided!")
        }
        const token= await this.authService.refreshToken(refreshDto.refreshToken);
        return {
            message:"Refresh Success",
            ...token
        }
    }
  
    // @Post('register')
    // async register(): Promise<{ token: string }> {
    //   const { username, password } = await this.authService.register(username, password);
    //   return { token };
    // }

}
