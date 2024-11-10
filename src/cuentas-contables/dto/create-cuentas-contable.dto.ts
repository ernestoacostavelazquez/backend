// create-cuentas-contable.dto.ts
import { IsNotEmpty, IsEnum, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCuentasContableDto {
  @IsNotEmpty()
  @IsString()
  codigo_cuenta: string;

  @IsNotEmpty()
  @IsString()
  nombre_cuenta: string;

  @IsNotEmpty()
  @IsEnum(['Deudora', 'Acreedora', 'No Aplica'])
  naturaleza: string;

  @IsNotEmpty()
  @IsEnum(['Titulo','Mayor', 'Auxiliar'])
  tipo: string;

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
  id_grupo_genero:number;

}
