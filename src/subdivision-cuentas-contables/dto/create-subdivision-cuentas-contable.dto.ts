import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class CreateSubdivisionCuentasContableDto {

    @IsNumber()
    @IsNotEmpty()
    codigo_subdivision:number;

    @IsString()
    @IsNotEmpty()
    nombre_subdivision:string;
   
   
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

}
