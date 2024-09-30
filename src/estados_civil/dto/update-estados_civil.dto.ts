import { PartialType } from '@nestjs/swagger';
import { CreateEstadosCivilDto } from './create-estados_civil.dto';

export class UpdateEstadosCivilDto extends PartialType(CreateEstadosCivilDto) {}
