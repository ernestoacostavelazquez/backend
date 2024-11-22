//create-marca.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMarcaDto {
    @IsString()
    @IsNotEmpty()
    nombre_marca: string;

    @IsString()
    @IsOptional()
    descripcion_marca?: string;

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
