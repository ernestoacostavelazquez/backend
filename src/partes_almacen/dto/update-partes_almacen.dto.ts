import { PartialType } from '@nestjs/swagger';
import { CreatePartesAlmacenDto } from './create-partes_almacen.dto';

export class UpdatePartesAlmacenDto extends PartialType(CreatePartesAlmacenDto) {}
