// create-pais.dto.ts
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaisDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    codigo_iso_alpha2: string;

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
