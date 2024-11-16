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

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'precio_unitario is not a valid decimal number' })
    @Min(0.01, { message: 'El precio unitario debe ser al menos 0,01' })
    costo_promedio: number;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio unitario no es un número decimal válido' })
    @Min(0.01, { message: 'El precio unitario debe ser al menos 0,01' })
    costo_planta: number;
    
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio unitario no es un número decimal válido' })
    @Min(0.01, { message: 'El precio unitario debe ser al menos 0,01' })
    precio_publico: number;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio unitario no es un número decimal válido' })
    @Min(0.01, { message: 'El precio unitario debe ser al menos 0,01' })
    precio_garantia: number;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio unitario no es un número decimal válido' })
    @Min(0.01, { message: 'El precio unitario debe ser al menos 0,01' })
    precio_mayorista: number;
  
    @IsInt()
    @IsOptional()
    existencia?: number;
  
    @IsInt()
    @IsOptional()
    stock_minimo?: number;

    @IsInt()
    @IsOptional()
    stock_maximo?: number;
  
    @IsInt()
    @IsOptional()
    backorder?: number;

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
