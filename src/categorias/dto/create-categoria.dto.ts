// create-categoria.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoriaDto {

    @IsNotEmpty()
    @IsString()
    nombre_categoria: string;

    @IsOptional()
    @IsString()
    descripcion_categoria?: string;

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
