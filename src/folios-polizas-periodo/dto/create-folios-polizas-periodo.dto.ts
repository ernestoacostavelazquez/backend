import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoliosPolizasPeriodoDto {
  @IsInt()
  @IsNotEmpty()
  ultimo_folio: number;

  @IsNotEmpty()
  @IsString()
  nombre_tipo_poliza: string;

  @IsNumber()
  @IsNotEmpty()
  id_tipo_poliza:number;

  @IsNumber()
  @IsNotEmpty()
  id_periodo:number;
}
