//create-colores-exteriore.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateColoresExterioreDto {
  @IsString()
  @IsNotEmpty()
  nombre_color_exterior: string;

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
  id_color: number; // 
}
