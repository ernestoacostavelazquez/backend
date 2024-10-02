import { IsNotEmpty, IsOptional, IsEnum, IsDecimal, IsInt, IsString, IsNumber, Min } from 'class-validator';
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
    descripcion?: string;
  
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'precio_unitario is not a valid decimal number' })
    @Min(0.01, { message: 'precio_unitario must be at least 0.01' })
    precio_unitario: number;
  
    @IsInt()
    @IsOptional()
    stock_actual?: number;
  
    @IsInt()
    @IsOptional()
    stock_minimo?: number;
  
    @IsString()
    @IsOptional()
    numero_parte_fabricante?: string;
  
    @IsEnum(['Activo', 'Inactivo'])
    @IsOptional()
    estatus?: string;
  
    @IsString()
    @IsOptional()
    garantia?: string;

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
    id_unidad:number;

    @IsNumber()
    @IsNotEmpty()
    id_categoria:number;

}
