import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDomiciliosPersonaDto {

    @IsString()
    @IsNotEmpty()
    calle: string;

    @IsString()
    @IsNotEmpty()
    numero_exterior: string;

    @IsOptional()
    @IsString()
    numero_interior?: string;

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
    id_persona:number;

    @IsNumber()
    @IsNotEmpty()
    id_codigo_postal:number;

    @IsNumber()
    @IsNotEmpty()
    id_tipo_domicilio:number;
}
