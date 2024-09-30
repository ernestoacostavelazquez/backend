import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePartesAlmacenDto {
    @IsInt()
    @IsOptional()
    stock_actual?: number;

    @IsInt()
    @IsOptional()
    stock_minimo?: number;

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
