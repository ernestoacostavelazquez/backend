// create-unidades_empaque.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUnidadesEmpaqueDto {
  @IsString()
  @IsNotEmpty()
  nombre_empaque: string;

  @IsString()
  @IsOptional()
  descripcion_empaque?: string;

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
