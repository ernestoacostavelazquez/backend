import { PartialType } from '@nestjs/swagger';
import { CreateMaestroParteDto } from './create-maestro_parte.dto';

export class UpdateMaestroParteDto extends PartialType(CreateMaestroParteDto) {}
