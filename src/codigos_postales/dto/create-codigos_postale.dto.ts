import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCodigosPostaleDto {
    @IsNotEmpty()
    @IsString()
    codigo: string;

    @IsNotEmpty()
    @IsString()
    localidad: string;

    @IsNotEmpty()
    @IsString()
    municipio: string;

    @IsNotEmpty()
    @IsString()
    estado: string;

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
