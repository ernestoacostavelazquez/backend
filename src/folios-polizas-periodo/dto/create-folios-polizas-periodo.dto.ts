import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFoliosPolizasPeriodoDto {
  @IsInt()
  @IsNotEmpty()
  ultimo_folio: number;
}
