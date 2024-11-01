import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Type } from 'class-transformer';

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    nombre_completo:string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password:string;

    @IsString()
    rol:string;

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
