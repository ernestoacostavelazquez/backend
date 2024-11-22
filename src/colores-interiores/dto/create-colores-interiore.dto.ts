// create-colores-interiore.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateColoresInterioreDto {
  @IsString()
  @IsNotEmpty()
  nombre_color_interior: string;

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
