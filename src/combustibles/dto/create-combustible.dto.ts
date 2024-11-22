// create-combustible.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCombustibleDto {
    @IsString()
    @IsNotEmpty()
    nombre_combustible: string;

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

