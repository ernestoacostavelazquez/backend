// create-cartera.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarteraDto {
    @IsString()
    @IsNotEmpty()
    nombre_cartera: string;

    @IsString()
    @IsOptional()
    descripcion_cartera?: string;

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
