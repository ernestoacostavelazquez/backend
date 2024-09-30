import { PartialType } from '@nestjs/swagger';
import { CreateTiposPersonaDto } from './create-tipos_persona.dto';

export class UpdateTiposPersonaDto extends PartialType(CreateTiposPersonaDto) {}
