import { PartialType } from '@nestjs/swagger';
import { CreateSubdivisionCuentasContableDto } from './create-subdivision-cuentas-contable.dto';

export class UpdateSubdivisionCuentasContableDto extends PartialType(CreateSubdivisionCuentasContableDto) {}
