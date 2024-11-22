// create-modelo.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateModeloDto {
    @IsString()
    @IsNotEmpty()
    nombre_modelo: string;

    @IsString()
    @IsOptional()
    descripcion_modelo?: string;

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

