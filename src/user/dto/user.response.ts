import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class UserResponseDto {
  /*
      Id пользователя
    */

  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: randomUUID(),
    type: 'string',
  })
  id: string;

  /*
      ФИО пользователя
    */

  @ApiProperty({
    description: 'ФИО пользователя',
    example: 'Петров Пётр Петрович',
    type: 'string',
  })
  name: string;

  /*
      Пароль пользователя
    */

  // @ApiProperty({
  //   description: 'Пароль пользователя',
  //   example: 'Qwerty123@',
  //   type: 'string',
  // })
  // password: string;

  /*
      Телефон пользователя
    */

  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '+79283000001',
    type: 'string',
  })
  phone: string;

  /*
      EMAIL
    */
  @ApiProperty({
    description: 'E-mail пользователя',
    example: 'example@example.com',
    type: 'string',
  })
  email: string;

  /*
      Роль пользователя
    */
  @ApiProperty({
    description: 'Роль пользователя',
    example: ['admin', 'user'],
    type: 'string',
  })
  role: string;
  /*
    Статус пользователя
  */
  @ApiProperty({
    description: 'Статус пользователя',
    example: true,
    type: 'boolean',
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Дата создания пользователя',
    example: new Date(),
    type: 'string',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления пользователя',
    example: new Date(),
    type: 'string',
  })
  updatedAt: Date;
}
