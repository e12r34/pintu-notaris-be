import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: 'username', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'Password', description: 'Password' })
  password: string;    
  }

export class LoginResultDto{
  message: string;
  accessToken: string;
  refreshToken: string;
}

export class refreshDto{
  @ApiProperty({ example: 'refreshToken', description: 'Refresh Token' })
  refreshToken: string;
}

export class RegisterRequestDto{
  @ApiProperty({ example: 'nama', description: 'Nama Akun/Notaris/User' })
  nama: string;
  @ApiProperty({ example: 'username', description: 'Username untuk login' })
  username: string;  
  @ApiProperty({ example: 'password', description: 'Password untuk login' })
  password: string;
  @ApiProperty({ example: ['role1','role2'], description: 'Role yang di assign' })
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
