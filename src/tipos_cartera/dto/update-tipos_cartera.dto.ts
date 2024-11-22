import { PartialType } from '@nestjs/swagger';
import { CreateTiposCarteraDto } from './create-tipos_cartera.dto';

export class UpdateTiposCarteraDto extends PartialType(CreateTiposCarteraDto) {}
