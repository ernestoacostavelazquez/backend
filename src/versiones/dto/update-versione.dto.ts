import { PartialType } from '@nestjs/swagger';
import { CreateVersioneDto } from './create-versione.dto';

export class UpdateVersioneDto extends PartialType(CreateVersioneDto) {}
