import { PartialType } from '@nestjs/swagger';
import { CreateTiposCuentasContableDto } from './create-tipos-cuentas-contable.dto';

export class UpdateTiposCuentasContableDto extends PartialType(CreateTiposCuentasContableDto) {}
