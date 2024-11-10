// create-periodos-contable.dto.ts
import { IsBoolean, IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { Type } from 'class-transformer';

export class CreatePeriodosContableDto {
    @IsNotEmpty()
    periodo: string;
    
    @IsNotEmpty()
    @IsDateString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'fecha_inicio debe estar en formato YYYY-MM-DD' })
    fecha_inicio: string;

    @IsNotEmpty()
    @IsDateString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'fecha_fin debe estar en formato YYYY-MM-DD' })
    fecha_fin: string;
  
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
