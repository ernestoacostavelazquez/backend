import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class CreatePeriodosContableDto {
    @IsNotEmpty()
    nombre_periodo: string;
  
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    fecha_inicio: Date;
  
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    fecha_fin: Date;
  
    @IsNotEmpty()
    @IsEnum(['Abierto', 'Cerrado'])
    estado: string;

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
