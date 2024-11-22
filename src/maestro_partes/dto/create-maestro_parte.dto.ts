import { IsNotEmpty, IsOptional, IsEnum, IsDecimal, IsInt, IsString, IsNumber, Min, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMaestroParteDto {
    @IsString()
    @IsNotEmpty()
    codigo_parte: string;
  
    @IsString()
    @IsNotEmpty()
    nombre_parte: string;
  
    @IsString()
    @IsOptional()
    descripcion_parte?: string;

   
    @IsString()
    @IsOptional()
    numero_parte_fabricante?: string;
   
    @IsString()
    @IsOptional()
    garantia_parte?: string;

    @IsNotEmpty()
    @IsEnum(['Nacional', 'Importada'])
    tipo_origen: string;

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
    id_unidad:number;

    @IsNumber()
    @IsNotEmpty()
    id_categoria:number;

}
