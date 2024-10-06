import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTiposPolizaDto {
  @IsNotEmpty()
  @IsString()
  nombre_tipo_poliza: string;

  @IsNotEmpty()
  @IsString()
  abreviatura: string;

  @IsOptional()
  @IsString()
  descripcion: string;
  
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
