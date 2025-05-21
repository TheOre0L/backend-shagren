import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  /*
    ФИО пользователя
  */

  @ApiProperty({
    description: 'ФИО пользователя',
    required: true,
    example: 'Петров Пётр Петрович',
    type: 'string',
  })
  @IsString({ message: 'Введённое значение не является строкой.' })
  @Length(2, 100, { message: 'ФИО должно содержать от 2 до 100 символов.' })
  @IsNotEmpty({ message: 'Указываемое значение не должно быть пустым.' })
  name: string;

  /*
    Пароль пользователя
  */

  @ApiProperty({
    description: 'Пароль пользователя',
    required: true,
    example: 'Qwerty123@',
    type: 'string',
  })
  @IsString({ message: 'Введённое значение не является строкой.' })
  @Length(6, 32, {
    message: 'Длина пароля должна быть не меньше 6 и не больше 32 символов.',
  })
  @IsNotEmpty({ message: 'Указываемое значение не должно быть пустым.' })
  password: string;

  /*
    Телефон пользователя
  */

  @ApiProperty({
    description: 'Номер телефона пользователя',
    required: true,
    example: '+79283000001',
    type: 'string',
  })
  @IsPhoneNumber('RU', {
    message: 'Номер телефона должен соответсвовать формату - +79283000001',
  })
  @IsNotEmpty({ message: 'Указываемое значение не должно быть пустым.' })
  phone: string;

  /*
    EMAIL
  */

  @ApiProperty({
    description: 'E-mail пользователя',
    example: 'example@example.com',
    type: 'string',
  })
  @IsString({ message: 'Введённое значение не является строкой.' })
  @IsNotEmpty({ message: 'Указываемое значение не должно быть пустым.' })
  @IsEmail(
    {},
    { message: 'Указанное значение не является адресом электронной почты.' },
  )
  email: string;

  /*
    Роль пользователя
  */
  @ApiProperty({
    description: 'Роль пользователя',
    example: ['admin', 'user'],
    type: 'string',
  })
  @IsString({ message: 'Введённое значение не является строкой.' })
  @IsNotEmpty({ message: 'Указываемое значение не должно быть пустым.' })
  role: 'admin' | 'user';

  /*
    Статус пользователя
  */

  @ApiProperty({
    description: 'Статус пользователя',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({ message: 'Значение должно быть true или false.' })
  @IsNotEmpty({ message: 'Указываемое значение не должно быть пустым.' })
  isActive: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
