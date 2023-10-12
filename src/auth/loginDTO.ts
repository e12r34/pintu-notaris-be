export class LoginDto {
    username: string;
    password: string;    
  }

export class LoginResultDto{
  message: string;
  access_token: string;
  refresh_token?: string;
}