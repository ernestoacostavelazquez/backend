//create-linea.dto.ts
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class CreateLineaDto {
    
    @IsString()
    @IsNotEmpty()
    nombre:string;
   
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
