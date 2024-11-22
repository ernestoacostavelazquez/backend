import { PartialType } from '@nestjs/swagger';
import { CreateUnidadesEmpaqueDto } from './create-unidades_empaque.dto';

export class UpdateUnidadesEmpaqueDto extends PartialType(CreateUnidadesEmpaqueDto) {}
