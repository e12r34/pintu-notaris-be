import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResultDto } from './loginDTO';
import { RegisterDataDto, RegisterDto, User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    
  @Post('register')
  async register(@Body() userData: User): Promise<RegisterDto> {
    try{
        const user = new User();
        user.nama = userData.nama;
        user.username = userData.username;
        user.password = userData.password; // Hash the password before saving
        user.role = userData.role;
        user.isactive = true;

        const createdUser = await this.authService.create(user)

        const userDataResponse: RegisterDataDto = {
            id: createdUser.id,
            name: createdUser.nama,
            username: createdUser.username,
            role: createdUser.role,
            isActive: createdUser.isactive,
        };

        const userResponse: RegisterDto = {
            message: "Register Success",
            data: userDataResponse
        }
    
        return userResponse;
    } catch (error){
          // Handle other errors or re-throw the error if it's unexpected
          throw error;
    }
    
  }

    @Post('login')
    async login(@Body() loginDto: LoginDto ) : Promise<LoginResultDto> {
        const username=loginDto.username
        const password=loginDto.password
        const accessToken= await this.authService.login(username, password);
        const loginMessage:LoginResultDto={
            message:"Login Success",
            ...accessToken
        }
        return loginMessage
    }
  
    // @Post('register')
    // async register(): Promise<{ token: string }> {
    //   const { username, password } = await this.authService.register(username, password);
    //   return { token };
    // }

}
