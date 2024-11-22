import { PartialType } from '@nestjs/swagger';
import { CreateTiposCajaDto } from './create-tipos_caja.dto';

export class UpdateTiposCajaDto extends PartialType(CreateTiposCajaDto) {}
