import { IsNotEmpty, IsOptional, IsDecimal, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDetallesPolizaDto {
    @IsNotEmpty()
    @IsString()
    codigo_cuenta: string;

    @IsNotEmpty()
    @IsString()
    nombre_cuenta: string;

    @IsNotEmpty()
    @IsDecimal()
    monto_debito: number;

    @IsNotEmpty()
    @IsDecimal()
    monto_credito: number;

    @IsOptional()
    @IsString()
    descripcion?: string;

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
