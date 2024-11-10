// create-grupos_generos_cuenta.dto.ts
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGruposGenerosCuentaDto {

   
    @IsString()
    @MaxLength(100)
    nombre_grupo: string;

    @IsInt()
    codigo_grupo: number;

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
    id_genero_cuenta:number;
}
