import { PartialType } from '@nestjs/swagger';
import { CreateDomiciliosPersonaDto } from './create-domicilios_persona.dto';

export class UpdateDomiciliosPersonaDto extends PartialType(CreateDomiciliosPersonaDto) {}
