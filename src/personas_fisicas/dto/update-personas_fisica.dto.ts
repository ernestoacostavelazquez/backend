import { PartialType } from '@nestjs/swagger';
import { CreatePersonasFisicaDto } from './create-personas_fisica.dto';

export class UpdatePersonasFisicaDto extends PartialType(CreatePersonasFisicaDto) {}
