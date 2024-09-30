import { PartialType } from '@nestjs/swagger';
import { CreateUnidadMedidaDto } from './create-unidad_medida.dto';

export class UpdateUnidadMedidaDto extends PartialType(CreateUnidadMedidaDto) {}
