import { PartialType } from '@nestjs/swagger';
import { CreateDetallesPolizaDto } from './create-detalles-poliza.dto';

export class UpdateDetallesPolizaDto extends PartialType(CreateDetallesPolizaDto) {}
