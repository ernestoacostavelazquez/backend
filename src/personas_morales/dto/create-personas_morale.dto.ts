import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePersonasMoraleDto {

    @IsString()
    @Length(1, 100)
    razon_social: string;

    @IsString()
    @Length(1, 100)
    nombre_comercial: string;

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
