import { IsNotEmpty, IsOptional, IsEmail, IsString, IsDate, IsPhoneNumber, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePersonasFisicaDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido_paterno: string;

    @IsOptional()
    @IsString()
    apellido_materno?: string;

    @IsNotEmpty()
    @IsDate()
    fecha_nacimiento: Date;

    @IsOptional()
    @IsEmail()
    correo_electronico?: string;

    @IsOptional()
    @IsPhoneNumber('MX')
    telefono?: string;

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




}
