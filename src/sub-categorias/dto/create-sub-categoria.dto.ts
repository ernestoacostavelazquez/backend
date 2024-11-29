// create-sub-categoria.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nombre_sub_categoria: string;

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

  @IsNotEmpty()
  @IsNumber()
  id_categoria: number;
}
