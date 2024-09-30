import { PartialType } from '@nestjs/swagger';
import { CreateMaestroPersonaDto } from './create-maestro_persona.dto';

export class UpdateMaestroPersonaDto extends PartialType(CreateMaestroPersonaDto) {}
