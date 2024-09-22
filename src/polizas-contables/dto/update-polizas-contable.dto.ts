import { PartialType } from '@nestjs/swagger';
import { CreatePolizasContableDto } from './create-polizas-contable.dto';

export class UpdatePolizasContableDto extends PartialType(CreatePolizasContableDto) {}
