import { PartialType } from '@nestjs/swagger';
import { CreateTiposDomicilioDto } from './create-tipos_domicilio.dto';

export class UpdateTiposDomicilioDto extends PartialType(CreateTiposDomicilioDto) {}
