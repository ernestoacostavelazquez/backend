import { PartialType } from '@nestjs/swagger';
import { CreateSaldosPeriodoDto } from './create-saldos-periodo.dto';

export class UpdateSaldosPeriodoDto extends PartialType(CreateSaldosPeriodoDto) {}
