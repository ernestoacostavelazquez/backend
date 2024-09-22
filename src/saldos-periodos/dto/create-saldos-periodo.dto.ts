import { IsNotEmpty, IsDecimal, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaldosPeriodoDto {
    @IsNotEmpty()
    @IsDecimal()
    saldo_inicial: number;
  
    @IsNotEmpty()
    @IsDecimal()
    cargos: number;
  
    @IsNotEmpty()
    @IsDecimal()
    abonos: number;
  
    @IsNotEmpty()
    @IsDecimal()
    saldo_final: number;

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
