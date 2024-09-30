import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDomiciliosPersonaDto {

    @IsString()
    @IsNotEmpty()
    calle: string;

    @IsString()
    @IsNotEmpty()
    numero_exterior: string;

    @IsOptional()
    @IsString()
    numero_interior?: string;

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
