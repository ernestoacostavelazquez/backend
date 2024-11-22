import { PartialType } from '@nestjs/swagger';
import { CreateCanalesVentaDto } from './create-canales_venta.dto';

export class UpdateCanalesVentaDto extends PartialType(CreateCanalesVentaDto) {}
