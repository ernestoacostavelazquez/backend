// create-polizas-contable.dto.ts
import { IsNotEmpty, IsEnum, IsOptional, IsString, IsDate, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePolizasContableDto {
  @IsNotEmpty()
  @IsString()
  numero_poliza: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fecha_poliza: Date;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsEnum(['Pendiente', 'Aprobada', 'Cancelada'])
  estado: string;

  @IsOptional()
  @IsString()
  referencia_documento?: string;

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

  @IsNumber()
  @IsNotEmpty()
  id_tipo_poliza:number;

}
