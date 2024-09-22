import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';


export class CreateTiposCuentasContableDto {

    @IsNumber()
    @IsNotEmpty()
    codigo_tipo:number;

    @IsString()
    @IsNotEmpty()
    nombre_tipo:string;
   
   
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


