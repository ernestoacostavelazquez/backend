import { PartialType } from '@nestjs/swagger';
import { CreatePeriodosContableDto } from './create-periodos-contable.dto';

export class UpdatePeriodosContableDto extends PartialType(CreatePeriodosContableDto) {}
