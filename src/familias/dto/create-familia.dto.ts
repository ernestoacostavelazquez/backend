// create-familia.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateFamiliaDto {
  @IsString()
  @IsNotEmpty()
  nombre_familia: string;

  @IsString()
  @IsOptional()
  descripcion_familia?: string;

  @IsOptional()
  created_by?: string;

  @IsOptional()
  updated_by?: string;

  @IsBoolean()
  @IsOptional()
  estatus?: boolean;
}
