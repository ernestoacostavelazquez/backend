import { IsNotEmpty, IsOptional, IsEmail, IsEnum, IsString, IsDate, IsPhoneNumber, Length, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMaestroPersonaDto {

    
    @IsString()
    @IsNotEmpty()
    rfc: string;

    @IsEnum(['Activo', 'Inactivo'])
    estatus: string;
    
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

    @IsNumber()
    @IsNotEmpty()
    id_genero:number;

    @IsNumber()
    @IsNotEmpty()
    id_tipo_persona:number;

    @IsNumber()
    @IsNotEmpty()
    id_estado_civil:number;

}
