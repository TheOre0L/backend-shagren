import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginDto {
  @ApiProperty({
    description: 'Логин пользователя',
    required: true,
    example: 'test@test.com',
    type: 'string',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Пароль',
    required: true,
    example: '123123123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

class TokensResponseDto {
  @ApiProperty({
    description: 'Access токен',
    example: '123',
    type: 'string',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh токен',
    example: '123',
    type: 'string',
  })
  refreshToken: string;
}

export { LoginDto, TokensResponseDto };
