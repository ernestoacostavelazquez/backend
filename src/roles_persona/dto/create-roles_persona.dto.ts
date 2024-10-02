import { IsOptional, IsDateString, IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRolesPersonaDto {
    @IsOptional()
    @IsDateString()
    fecha_asignacion?: string;

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
    id_persona:number;

    @IsNumber()
    @IsNotEmpty()
    id_rol:number;




}
