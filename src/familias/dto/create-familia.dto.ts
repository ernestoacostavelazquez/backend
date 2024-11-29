// create-familia.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFamiliaDto {
  @IsString()
  @IsNotEmpty()
  nombre_familia: string;

  @IsString()
  @IsOptional()
  descripcion_familia?: string;

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

  @IsNumber()
  @IsNotEmpty()
  id_marca: number;
}
