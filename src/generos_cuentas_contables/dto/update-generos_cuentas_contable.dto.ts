import { PartialType } from '@nestjs/swagger';
import { CreateGenerosCuentasContableDto } from './create-generos_cuentas_contable.dto';

export class UpdateGenerosCuentasContableDto extends PartialType(CreateGenerosCuentasContableDto) {}
