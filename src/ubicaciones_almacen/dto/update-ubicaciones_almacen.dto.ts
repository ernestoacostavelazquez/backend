import { PartialType } from '@nestjs/swagger';
import { CreateUbicacionesAlmacenDto } from './create-ubicaciones_almacen.dto';

export class UpdateUbicacionesAlmacenDto extends PartialType(CreateUbicacionesAlmacenDto) {}
