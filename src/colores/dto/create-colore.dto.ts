//create-colore.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateColoreDto {
  @IsString()
  @IsNotEmpty()
  nombre_color: string;

  @IsOptional()
  @Type(() => Date)
  created_at?: Date;

  @IsOptional()
  @Type(() => Date)
  updated_at?: Date;

  @IsOptional()
  @IsString()
  created_by?: string;

  @IsOptional()
  @IsString()
  updated_by?: string;


  @IsBoolean()
  estatus: boolean;

}
