import { IsString, IsOptional, IsIn } from 'class-validator';
import { UUID } from 'crypto';

export class TypeFilterDto {
  @IsString()
  @IsIn(['findForType', 'all'], {
    message: 'action должен быть findForType или all',
  })
  action: string;

  @IsOptional()
  @IsString({ message: 'typeId должен быть строкой' })
  typeId?: UUID;

  @IsOptional()
  @IsString({ message: 'categoryId должен быть строкой' })
  categoryId?: UUID;
}
