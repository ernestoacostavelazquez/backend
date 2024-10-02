import { IsNotEmpty, IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCuentasContableDto {
  @IsNotEmpty()
  @IsString()
  codigo_cuenta: string;

  @IsNotEmpty()
  @IsString()
  nombre_cuenta: string;

  @IsNotEmpty()
  @IsEnum(['Deudora', 'Acreedora'])
  naturaleza: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

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

  @IsNumber()
  @IsNotEmpty()
  id_subdivision:number;
}
