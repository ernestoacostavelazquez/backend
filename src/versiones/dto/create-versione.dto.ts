// create-versione.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVersioneDto {
    @IsString()
    @IsNotEmpty()
    nombre_version: string;

    @IsString()
    @IsOptional()
    descripcion_version?: string;

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
