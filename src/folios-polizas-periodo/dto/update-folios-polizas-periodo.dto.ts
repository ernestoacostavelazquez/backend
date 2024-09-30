import { PartialType } from '@nestjs/swagger';
import { CreateFoliosPolizasPeriodoDto } from './create-folios-polizas-periodo.dto';

export class UpdateFoliosPolizasPeriodoDto extends PartialType(CreateFoliosPolizasPeriodoDto) {}
