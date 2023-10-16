export class LoginDto {
    username: string;
    password: string;    
  }

export class LoginResultDto{
  message: string;
  accessToken: string;
  refreshToken: string;
}

export class refreshDto{
  refreshToken: string;
}

export class RegisterRequestDto{
  nama: string;
  username: string;  
  password: string;
  role: string[];
}

export class RegisterResponseDto {
  message: string;
  data: RegisterDataDto
}

export class RegisterDataDto {
  id: string;
  name: string;
  username: string;
  role: string[];
  isActive: boolean;
}
